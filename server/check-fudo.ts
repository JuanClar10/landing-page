import { fudoCredentials, FudoError, readProducts } from './fudo.ts'
import catalog from '../wiki/raw/fudo-menu-2026-11-20.json' with { type: 'json' }

try {
  const credentials = fudoCredentials()
  if (!credentials) {
    throw new Error('Completa FUDO_API_KEY y FUDO_API_SECRET en el archivo local .env.')
  }
  const products = await readProducts(credentials)
  const publicProducts = new Map(catalog.products.map(product => [product.id, product]))
  const matches = products.filter(product => {
    const local = publicProducts.get(String(product.id))
    return local && product.attributes?.name?.trim() === local.name.trim()
  })
  const stockCount = matches.filter(product => product.attributes.stockControl === true
    && Number.isFinite(product.attributes.stock)).length
  console.log('Lectura de Fudo correcta.')
  console.log('Productos públicos con ID y nombre coincidentes: ' + matches.length + ' de ' + publicProducts.size)
  console.log('Coincidencias con stock numérico y control activo: ' + stockCount)
  const ids = new Set(process.argv.slice(2))
  for (const id of ids) {
    const product = matches.find(item => String(item.id) === id)
    if (!product) {
      console.log(id + ' · sin coincidencia entre Fudo y la carta pública')
      continue
    }
    const { name, stock, stockControl } = product.attributes
    console.log(id + ' · ' + name + ' · control ' + (stockControl === true ? 'activo' : 'sin confirmar')
      + ' · stock ' + (typeof stock === 'number' && Number.isFinite(stock) ? stock : 'sin valor numérico'))
  }
  console.log('Antes de mostrar stock, compara ejemplos de Fudo con la carta y revisa los productos por receta.')
} catch (error) {
  console.error(error instanceof FudoError
    ? error.message + ' · Revisa las credenciales y los permisos del rol.'
    : error instanceof Error ? error.message : 'Error al consultar Fudo.')
  process.exitCode = 1
}
