const AUTH_URL = 'https://auth.fu.do/api'
const PRODUCTS_URL = 'https://api.fu.do/v1alpha1/products'
const PAGE_SIZE = 500

type Credential = { key: string; secret: string }
export type InventoryProduct = {
  id: string
  attributes: {
    name?: string
    active?: boolean
    stock?: number | null
    stockControl?: boolean
  }
}

export function fudoCredentials(): Credential | null {
  const key = process.env.FUDO_API_KEY?.trim()
  const secret = process.env.FUDO_API_SECRET?.trim()
  return key && secret ? { key, secret } : null
}

export class FudoError extends Error {
  readonly status: number

  constructor(step: string, status: number) {
    super('Fudo ' + step + ' HTTP ' + status)
    this.status = status
  }
}

let session: { token: string; expires: number } | undefined

async function accessToken(credentials: Credential) {
  if (session && Date.now() + 60_000 < session.expires) return session.token

  const response = await fetch(AUTH_URL, {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({ apiKey: credentials.key, apiSecret: credentials.secret }),
    signal: AbortSignal.timeout(10_000),
  })
  if (!response.ok) throw new FudoError('autenticación', response.status)
  const payload: { token?: unknown; exp?: unknown } = await response.json()
  const expiration = typeof payload.exp === 'string' || typeof payload.exp === 'number'
    ? Number(payload.exp)
    : NaN
  if (typeof payload.token !== 'string' || !payload.token || !Number.isFinite(expiration)) {
    throw new Error('Respuesta de autenticación de Fudo inesperada')
  }
  session = { token: payload.token, expires: expiration * 1000 }
  return session.token
}

function requestProducts(url: URL, token: string) {
  return fetch(url, {
    headers: { Accept: 'application/json', Authorization: 'Bearer ' + token },
    signal: AbortSignal.timeout(10_000),
  })
}

export async function readProducts(credentials: Credential): Promise<InventoryProduct[]> {
  const products: InventoryProduct[] = []
  for (let page = 1; ; page++) {
    const url = new URL(PRODUCTS_URL)
    url.searchParams.set('page[size]', String(PAGE_SIZE))
    url.searchParams.set('page[number]', String(page))
    url.searchParams.set('sort', 'id')
    let response = await requestProducts(url, await accessToken(credentials))
    if (response.status === 401) {
      session = undefined
      response = await requestProducts(url, await accessToken(credentials))
    }
    if (!response.ok) throw new FudoError('lectura de productos', response.status)

    const payload: { data?: InventoryProduct[] } = await response.json()
    if (!Array.isArray(payload.data)) throw new Error('Lista de productos de Fudo inesperada')
    products.push(...payload.data)
    if (payload.data.length < PAGE_SIZE) return products
  }
}
