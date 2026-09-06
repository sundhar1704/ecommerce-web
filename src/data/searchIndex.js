import { categoryProducts } from './categoryProducts'

const productEntries = Object.entries(categoryProducts).flatMap(([slug, products]) =>
  products.map((p) => ({
    type: 'product',
    id: p.id,
    name: p.name,
    subtitle: p.subtitle,
    image: p.image,
    price: p.price,
    categorySlug: slug,
  }))
)

const pageEntries = [
  { type: 'page', name: 'Home', path: '/' },
  { type: 'page', name: 'About Us', path: '/about' },
  { type: 'page', name: 'Categories', path: '/categories' },
  { type: 'page', name: 'Contact', path: '/contact' },
  { type: 'page', name: 'Cart', path: '/cart' },
]

export const searchIndex = [...productEntries, ...pageEntries]

export function searchItems(query) {
  const q = query.trim().toLowerCase()
  if (!q) return []
  return searchIndex.filter((item) =>
    item.name.toLowerCase().includes(q) ||
    (item.subtitle && item.subtitle.toLowerCase().includes(q))
  )
}