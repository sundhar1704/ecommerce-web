import { useNavigate } from 'react-router-dom'
import SectionTitle from '../ui/SectionTitle'
import './Categories.css'

import vegBasket from '../../assets/freshveg.png'
import dairy from '../../assets/dairy.png'
import fruitBasket from '../../assets/Fresh1.png'

const categories = [
  { image: vegBasket, name: 'Fresh Vegetables', offer: 'Upto 45% Off', slug: 'vegetables' },
  { image: dairy, name: 'Dairy Products', offer: 'Upto 45% Off', slug: 'dairy-products' },
  { image: fruitBasket, name: 'Fresh Fruits', offer: 'Upto 45% Off', slug: 'fruits' },
]

function Categories() {
  const navigate = useNavigate()

  return (
    <section className="categories" id="categories">
      <SectionTitle prefix="Our" highlight="Categories" />
      <div className="categories-grid">
        {categories.map((c, i) => (
          <div className="category-card" key={i}>
            <div className="category-card-inner">
              <img src={c.image} alt={c.name} />
              <h3>{c.name}</h3>
              <p>{c.offer}</p>
              <button className="shop-btn" onClick={() => navigate(`/categories/${c.slug}`)}>
                Shop Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Categories