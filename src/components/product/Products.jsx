import SectionTitle from '../ui/SectionTitle'
import ProductCard from './ProductCard'
import './Products.css'

import onion from '../../assets/grocery img. 11.png'
import orange from '../../assets/grocery img. 32.png'
import carrot from '../../assets/grocery img. 28.png'
import apple from '../../assets/apple.png'
import watermelon from '../../assets/watermelon.png'
import brinjal from '../../assets/bringal.png'

const products = [
  { image: onion, name: 'Fresh Onion', price: '$4.99 - $10.99' },
  { image: orange, name: 'Fresh Orange', price: '$4.99 - $10.99' },
  { image: carrot, name: 'Fresh Carrot', price: '$4.99 - $10.99' },
  { image: apple, name: 'Fresh Green Apple', price: '$4.99 - $10.99' },
  { image: watermelon, name: 'Fresh Watermelon', price: '$4.99 - $10.99' },
  { image: brinjal, name: 'Fresh Brinjal', price: '$4.99 - $10.99' },
]

function Products() {
  return (
    <section className="products">
      <SectionTitle prefix="Our" highlight="products" />
      <div className="products-grid">
        {products.map((p, i) => (
          <ProductCard key={i} {...p} />
        ))}
      </div>
    </section>
  )
}

export default Products