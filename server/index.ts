import { createServer } from 'node:http'
import type { IncomingMessage, ServerResponse } from 'node:http'
import { readFile } from 'node:fs/promises'
import { extname, resolve, sep } from 'node:path'
import { fileURLToPath } from 'node:url'
import catalog from '../wiki/raw/fudo-menu-2026-11-20.json' with { type: 'json' }
import type { StockSnapshot } from '../src/types.ts'
import { fudoCredentials, readProducts } from './fudo.ts'

const dev = process.argv.includes('--dev')
const port = Number(process.env.PORT ?? 4320)
const host = process.env.HOST ?? '127.0.0.1'
const dist = fileURLToPath(new URL('../dist', import.meta.url))
const credentials = fudoCredentials()
const products = new Map(catalog.products.map(product => [product.id, product]))

let cache: { until: number; snapshot: StockSnapshot } | undefined
let refresh: Promise<StockSnapshot> | undefined

async function loadStock(): Promise<StockSnapshot> {
  if (process.env.FUDO_SHOW_STOCK !== 'true' || !credentials) return { states: {} }
  if (cache && Date.now() < cache.until) return cache.snapshot
  if (refresh) return refresh

  refresh = readProducts(credentials).then(inventory => {
    const states: StockSnapshot['states'] = {}
    for (const { id, attributes } of inventory) {
      const product = products.get(String(id))
      if (!product || attributes?.name?.trim() !== product.name.trim()) continue
      if (attributes.active === false || attributes.stockControl !== true) continue
      if (typeof attributes.stock !== 'number' || !Number.isFinite(attributes.stock)) continue
      states[id] = attributes.stock > 0 ? 'available' : 'sold-out'
    }
    const snapshot = { states }
    cache = { until: Date.now() + 60_000, snapshot }
    return snapshot
  }).catch(error => {
    console.warn(error instanceof Error ? error.message : 'Fudo: consulta fallida')
    const snapshot = { states: {} }
    cache = { until: Date.now() + 20_000, snapshot }
    return snapshot
  }).finally(() => { refresh = undefined })
  return refresh
}

const mimeTypes: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
}

function plain(res: ServerResponse, status: number, message: string) {
  res.writeHead(status, { 'Content-Type': 'text/plain; charset=utf-8' }).end(message)
}

let vite: import('vite').ViteDevServer | undefined

const server = createServer(async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const path = decodeURIComponent(new URL(req.url ?? '/', 'http://localhost').pathname)
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      res.setHeader('Allow', 'GET, HEAD')
      return plain(res, 405, 'Método no permitido')
    }
    if (path === '/api/stock') {
      const data = await loadStock()
      return res.writeHead(200, {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-store',
      }).end(req.method === 'HEAD' ? undefined : JSON.stringify(data))
    }
    if (path.startsWith('/api/')) return plain(res, 404, 'No encontrado')
    if (vite) {
      return vite.middlewares(req, res, () => plain(res, 404, 'No encontrado'))
    }

    const file = resolve(dist, path === '/' ? 'index.html' : '.' + path)
    if (!file.startsWith(dist + sep)) return plain(res, 404, 'No encontrado')
    const data = await readFile(file)
    return res.writeHead(200, {
      'Content-Type': mimeTypes[extname(file)] ?? 'application/octet-stream',
      'Cache-Control': path.startsWith('/assets/') ? 'public, max-age=31536000, immutable' : 'no-cache',
      'X-Content-Type-Options': 'nosniff',
    }).end(req.method === 'HEAD' ? undefined : data)
  } catch (error) {
    if (error instanceof URIError) return plain(res, 400, 'Dirección inválida')
    const code = (error as NodeJS.ErrnoException).code
    if (code === 'ENOENT' || code === 'EISDIR' || code === 'ENOTDIR') return plain(res, 404, 'No encontrado')
    console.error(error)
    return plain(res, 500, 'Error del servidor')
  }
})

if (dev) {
  vite = await (await import('vite')).createServer({
    configLoader: 'runner',
    server: { middlewareMode: true, hmr: { server } },
    appType: 'spa',
  })
}

server.listen(port, host, () => {
  console.log('La Postrería Café · http://' + host + ':' + port)
})
