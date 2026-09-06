import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ChevronDown, Heart } from 'lucide-react'
import { categoryProducts } from '../data/categoryProducts'
import { useCart } from '../context/CartContext'
import './CategoryShop.css'

const categoryList = [
  { slug: 'vegetables', name: 'Vegetables' },
  { slug: 'fruits', name: 'Fruits' },
  { slug: 'dairy-products', name: 'Dairy Products' },
  { slug: 'fresh-meats', name: 'Fresh Meats' },
]

const allProducts = Object.values(categoryProducts).flat()

function CategoryShop() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()

  const [isOpen, setIsOpen] = useState(true)
  const [activeSlug, setActiveSlug] = useState(slug || null)
  const [wishlist, setWishlist] = useState({})

  useEffect(() => {
    setActiveSlug(slug || null)
  }, [slug])

  const products = activeSlug ? (categoryProducts[activeSlug] || []) : allProducts

  const toggleWishlist = (name) => {
    setWishlist((prev) => ({ ...prev, [name]: !prev[name] }))
  }

  const handleCategoryClick = (categorySlug) => {
    navigate(`/categories/${categorySlug}`)
  }

  const handleBack = () => {
    navigate('/categories')
  }

  const handleBuyNow = (product) => {
    addToCart({ name: product.name, price: product.price, image: product.image })
    navigate('/cart')
  }

  return (
    <div className="shop-page-wrapper">
      <div className="shop-page">
        <aside className="shop-sidebar">
          <button className="shop-sidebar-header" onClick={() => setIsOpen(!isOpen)}>
            <h3>Categories</h3>
            <ChevronDown size={20} className={isOpen ? 'chevron open' : 'chevron'} />
          </button>

          {isOpen && (
            <ul className="shop-category-list">
              {categoryList.map((c) => (
                <li key={c.slug}>
                  <button
                    className={activeSlug === c.slug ? 'shop-category-item active' : 'shop-category-item'}
                    onClick={() => handleCategoryClick(c.slug)}
                  >
                    {c.name}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </aside>

        <div className="shop-content">
          <div className="shop-products-grid">
            {products.map((p, i) => (
              <div className="shop-product-card" key={i}>
                <button
                  className="shop-wishlist-btn"
                  onClick={() => toggleWishlist(p.name)}
                  aria-label="Add to wishlist"
                >
                  <Heart size={16} fill={wishlist[p.name] ? 'currentColor' : 'none'} stroke="currentColor" />
                </button>
                <Link to={`/product/${p.id}`}>
                  <img src={p.image} alt={p.name} />
                </Link>
                <p className="shop-product-price">${p.price}</p>
                <Link to={`/product/${p.id}`} className="shop-product-name-link">
                  <h4>{p.name}</h4>
                </Link>
                <span className="shop-product-sub">{p.subtitle}</span>
                <button className="shop-buy-now-btn" onClick={() => handleBuyNow(p)}>
                  Buy Now
                </button>
              </div>
            ))}
          </div>

          {activeSlug && (
            <div className="shop-pagination">
              <button onClick={handleBack}>← Back</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CategoryShop