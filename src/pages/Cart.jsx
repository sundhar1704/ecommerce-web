import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Trash2 } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import './Cart.css'

const VALID_COUPONS = {
  SAVE10: 0.10,
  SAVE20: 0.20,
  GROCO50: 0.50,
}

function Cart() {
  const { cartItems, removeFromCart, totalPrice } = useCart()
  const { currentUser } = useAuth()
  const navigate = useNavigate()

  const [couponInput, setCouponInput] = useState('')
  const [appliedCoupon, setAppliedCoupon] = useState(null)
  const [couponMessage, setCouponMessage] = useState('')

  const goToShopping = () => navigate('/#products')

  const handleApplyCoupon = () => {
    const code = couponInput.trim().toUpperCase()
    if (!code) {
      setCouponMessage('Please enter a coupon code.')
      setAppliedCoupon(null)
      return
    }
    if (VALID_COUPONS[code]) {
      setAppliedCoupon(code)
      setCouponMessage(`Coupon applied! ${VALID_COUPONS[code] * 100}% off.`)
    } else {
      setAppliedCoupon(null)
      setCouponMessage('Invalid coupon code.')
    }
  }

  const handleCheckout = () => {
    if (!currentUser) {
      navigate('/login')
      return
    }
    navigate('/checkout')
  }

  const discount = appliedCoupon ? totalPrice * VALID_COUPONS[appliedCoupon] : 0
  const finalTotal = totalPrice - discount

  return (
    <section className="cart-page">
      <h1 className="cart-heading">+ Card</h1>

      <div className="cart-inner">
        {cartItems.length === 0 ? (
          <div className="cart-empty">
            <p>Your cart is empty.</p>
            <button className="back-shopping-btn" onClick={goToShopping}>
              ← Back To Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items-list">
              {cartItems.map((item) => (
                <div className="cart-row" key={item.name}>
                  <img src={item.image} alt={item.name} className="cart-item-img" />
                  <div className="cart-item-details">
                    <h4>{item.name}</h4>
                    <p className="cart-item-price">${item.price}</p>
                  </div>
                  <span className="cart-item-qty">Qty:{item.qty}</span>
                  <button
                    className="cart-delete-btn"
                    onClick={() => removeFromCart(item.name)}
                    aria-label="Remove item"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-bottom-row">
              <div className="cart-total">
                {appliedCoupon && (
                  <span className="cart-original-price">${totalPrice.toFixed(3)}</span>
                )}
                <span>Total</span>
                <span>:</span>
                <span>${finalTotal.toFixed(3)}</span>
              </div>
              <button className="checkout-btn" onClick={handleCheckout}>Checkout</button>
            </div>

            <div className="cart-coupon-row">
              <input
                type="text"
                placeholder="Coupon Code"
                className="coupon-input"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
              />
              <button className="apply-coupon-btn" onClick={handleApplyCoupon}>
                Apply Coupon
              </button>
            </div>
            {couponMessage && (
              <p className={appliedCoupon ? 'coupon-msg success' : 'coupon-msg error'}>
                {couponMessage}
              </p>
            )}

            <button className="back-shopping-btn" onClick={goToShopping}>
              ← Back To Shopping
            </button>
          </>
        )}
      </div>
    </section>
  )
}

export default Cart