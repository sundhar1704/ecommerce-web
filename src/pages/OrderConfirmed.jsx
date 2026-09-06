import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import './OrderConfirmed.css'

function OrderConfirmed() {
  const navigate = useNavigate()
  const { cartItems, totalPrice, clearCart } = useCart()
  const [orderSnapshot, setOrderSnapshot] = useState(null)

  useEffect(() => {
    // Snapshot the cart before clearing it, and save order date for tracking
    const snapshot = { items: cartItems, subtotal: totalPrice, date: new Date().toISOString() }
    setOrderSnapshot(snapshot)
    localStorage.setItem('groco_last_order', JSON.stringify(snapshot))
    clearCart()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!orderSnapshot) return null

  const shipping = 15.00
  const total = orderSnapshot.subtotal + shipping

  return (
    <section className="confirm-page">
      <h1 className="confirm-thankyou">Thank You!</h1>

      <div className="confirm-card">
        <div className="checkout-steps">
          <span className="step done">Shipping</span>
          <span className="step-line done" />
          <span className="step done">Payment</span>
          <span className="step-line done" />
          <span className="step done">Confirm</span>
        </div>

        <div className="confirm-check">✓</div>
        <h2 className="confirm-heading">Payment Confirmed</h2>
        <p className="confirm-sub">Thank you for your purchase! Your order has been successfully processed.</p>

        <div className="order-summary-box">
          <h3>Order Summary</h3>
          {orderSnapshot.items.map((item) => (
            <div className="summary-item" key={item.name}>
              <img src={item.image} alt={item.name} />
              <div>
                <p className="summary-name">{item.name}</p>
                <p className="summary-qty">Quantity: {item.qty}</p>
              </div>
              <span className="summary-price">
                ${(parseFloat(String(item.price).replace(/[^0-9.]/g, '')) * item.qty).toFixed(2)}
              </span>
            </div>
          ))}
          <div className="summary-row">
            <span>Subtotal</span>
            <span>${orderSnapshot.subtotal.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>${shipping.toFixed(2)}</span>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        <div className="next-steps-box">
          <h3>Next Steps</h3>
          <p>You will receive an email confirmation shortly with your order details and tracking information.</p>
          <p>If you have any questions, please contact our support team.</p>
        </div>

        <div className="confirm-btn-row">
          <button className="continue-shopping-btn" onClick={() => navigate('/')}>
            Continue Shopping
          </button>
          <button className="view-tracking-btn" onClick={() => navigate('/tracking')}>
            View Tracking Details
          </button>
        </div>
      </div>
    </section>
  )
}

export default OrderConfirmed