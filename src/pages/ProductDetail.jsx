import { useParams, useNavigate } from 'react-router-dom'
import { Star, ShoppingCart } from 'lucide-react'
import { categoryProducts } from '../data/categoryProducts'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import './ProductDetail.css'

const allProducts = Object.values(categoryProducts).flat()

function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const { currentUser } = useAuth()

  const product = allProducts.find((p) => p.id === id)

  if (!product) {
    return (
      <section className="product-detail-page">
        <p>Product not found.</p>
        <button onClick={() => navigate('/categories')}>← Back to Categories</button>
      </section>
    )
  }

  const handleAddToCart = () => {
    addToCart({ name: product.name, price: product.price, image: product.image })
  }

  const handleBuyNow = () => {
    addToCart({ name: product.name, price: product.price, image: product.image })
    if (currentUser) {
      navigate('/checkout')
    } else {
      navigate('/login', { state: { from: '/checkout' } })
    }
  }

  return (
    <section className="product-detail-page">
      <div className="product-detail-grid">
        <img src={product.image} alt={product.name} className="product-detail-img" />

        <div className="product-detail-info">
          <h1>{product.name}</h1>
          <p className="product-detail-sub">{product.subtitle}</p>
          <p className="product-detail-price">${product.price}</p>

          <div className="product-detail-actions">
            <button className="add-to-cart-btn" onClick={handleAddToCart}>
              <ShoppingCart size={16} /> Add to Card
            </button>
            <button className="buy-now-btn" onClick={handleBuyNow}>Buy Now</button>
          </div>
        </div>
      </div>

      <div className="product-detail-rating">
        {product.rating}
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={16} fill={i < product.rating ? '#f5b301' : 'none'} color="#f5b301" />
        ))}
      </div>

      <div className="product-detail-section">
        <h3>Product Details</h3>
        <p>{product.description}</p>
      </div>

      <div className="product-detail-section">
        <h3>Review</h3>
        {product.reviews?.map((r, i) => (
          <div className="review-block" key={i}>
            <div className="review-avatar" />
            <div>
              <p className="review-name">{r.name}</p>
              <p className="review-text">{r.text}</p>
              <div className="review-stars">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} size={12} fill={j < r.stars ? '#f5b301' : 'none'} color="#f5b301" />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default ProductDetail