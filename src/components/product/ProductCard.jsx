import { useCart } from '../../context/CartContext'
import './ProductCard.css'

function ProductCard({ image, name, price }) {
  const { addToCart } = useCart()

  return (
    <div className="product-card">
      <div className="product-card-inner">
        <img src={image} alt={name} className="product-img" />
        <h3>{name}</h3>
        <p className="product-price">{price}</p>
        <div className="product-rating">★★★★★</div>
        <button className="add-to-cart-btn" onClick={() => addToCart({ name, price, image })}>
          Add to card
        </button>
      </div>
    </div>
  )
}

export default ProductCard