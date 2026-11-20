export type Product = {
  id: string
  category: string
  path: string
  name: string
  description: string
  price: number
  image: string
  wasSoldOut: boolean
}

export type Availability = 'available' | 'sold-out' | 'unknown'
export type StockSnapshot = { states: Record<string, Availability> }
