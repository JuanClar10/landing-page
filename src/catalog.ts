import catalog from '../wiki/raw/fudo-menu-2026-11-20.json'
import type { Product } from './types'

export const products: Product[] = Array.from(new Map(catalog.products.map(product => [product.id, product])).values())
export const menuUrl = catalog.source
export const whatsappLink = (message: string) => 'https://wa.me/573166447477?text=' + encodeURIComponent(message)
export const maps = 'https://www.google.com/maps/search/?api=1&query=Calle+14+8-59+Cañahuate+Valledupar'

export const categories: Record<string, string> = {
  'combo-del-dia': 'Combo del día',
  'combos-cuchareables': 'Combos cuchareables',
  postres: 'Postres',
  cheesecakes: 'Cheesecakes',
  'arroz-con-leche': 'Arroz con leche',
  cuchareables: 'Cuchareables',
  sandwiches: 'Sándwiches',
  'horneados-salados': 'Horneados salados',
  'horneados-dulces': 'Horneados dulces',
  'bebidas-calientes': 'Bebidas calientes',
  'bebidas-frias': 'Bebidas frías',
  sodas: 'Sodas',
  malteadas: 'Malteadas',
  frappe: 'Frappés',
  brownies: 'Brownies',
  'tortas-frias-mini': 'Tortas frías mini',
  'tortas-frias-1-2-libra': 'Tortas frías · ½ libra',
  'tortas-frias-1-libra': 'Tortas frías · 1 libra',
  'tortas-mini-ponque': 'Ponqués mini',
  'tortas-1-2-libra-ponque': 'Ponqués · ½ libra',
  'tortas-1-libra-ponque': 'Ponqués · 1 libra',
  'flork-divertidas-mini': 'Tortas meme mini',
  'flork-divertidas-1-2-lb': 'Tortas meme · ½ libra',
  'flork-divertidas-1-lb': 'Tortas meme · 1 libra',
  'cajas-detalle': 'Cajas detalle',
  'mesa-de-dulces': 'Mesa de dulces',
  shots: 'Shots',
  'velitas-y-toppers': 'Velitas y toppers',
}

export const collections = [
  { id: 'postres', name: 'Postres y cuchareables', short: 'Postres', photo: '120', categories: ['postres', 'arroz-con-leche', 'cuchareables', 'combos-cuchareables', 'brownies'] },
  { id: 'tortas', name: 'Tortas y cheesecakes', short: 'Tortas', photo: '182', categories: ['cheesecakes', ...Object.keys(categories).filter(key => key.startsWith('tortas-') || key.startsWith('flork-'))] },
  { id: 'cafe', name: 'Café y horneados', short: 'Café y horneados', photo: '23', categories: ['combo-del-dia', 'bebidas-calientes', 'bebidas-frias', 'sodas', 'malteadas', 'frappe', 'sandwiches', 'horneados-salados', 'horneados-dulces'] },
  { id: 'detalles', name: 'Regalos y detalles', short: 'Regalos', photo: '398', categories: ['cajas-detalle', 'mesa-de-dulces', 'shots', 'velitas-y-toppers'] },
]

export const productPhoto = (product: Product) => '/fudo/' + product.id + '.webp'

export const featured = ['163', '120', '154', '77'].flatMap(id => products.filter(product => product.id === id))

const currency = new Intl.NumberFormat('es-CO', {
  style: 'currency', currency: 'COP', maximumFractionDigits: 0,
})
export const formatPrice = (value: number) => currency.format(value)
export const searchKey = (text: string) => text.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase()
