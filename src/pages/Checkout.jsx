import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import './Checkout.css'

const VALID_PROMOS = { SAVE10: 0.10, SAVE20: 0.20, GROCO50: 0.50 }

function Checkout() {
  const { cartItems, totalPrice } = useCart()
  const { currentUser } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    firstName: '', lastName: '', email: currentUser?.email || '',
    phone: '', address: '', city: '', state: '', zip: '', country: '',
  })
  const [payment, setPayment] = useState('card')
  const [promoInput, setPromoInput] = useState('')
  const [promoApplied, setPromoApplied] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleApplyPromo = () => {
    const code = promoInput.trim().toUpperCase()
    if (VALID_PROMOS[code]) {
      setPromoApplied(true)
    } else {
      setPromoApplied(false)
    }
  }

  const discount = promoApplied ? totalPrice * VALID_PROMOS[promoInput.trim().toUpperCase()] : 0
  const shipping = 5.00
  const finalTotal = totalPrice - discount + shipping

  const handleContinue = (e) => {
    e.preventDefault()
    setError('')
    const required = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'state', 'zip', 'country']
    if (required.some((field) => !form[field])) {
      setError('Please fill in all delivery information fields.')
      return
    }
    navigate('/payment', { state: { form, payment, finalTotal } })
  }

  return (
    <section className="checkout-page">
      <h1 className="checkout-heading">Check Out</h1>

      <div className="checkout-steps">
        <span className="step active">1 Shipping</span>
        <span className="step-line" />
        <span className="step">2 Payment</span>
        <span className="step-line" />
        <span className="step">3 Confirm</span>
      </div>

      <div className="checkout-grid">
        <form className="checkout-form" onSubmit={handleContinue}>
          <h3>Delivery Information</h3>
          <div className="form-row">
            <input name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} />
            <input name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} />
          </div>
          <input name="email" placeholder="Email Address" value={form.email} onChange={handleChange} />
          <input name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} />
          <input name="address" placeholder="Street Address" value={form.address} onChange={handleChange} />
          <div className="form-row three">
            <input name="city" placeholder="City" value={form.city} onChange={handleChange} />
            <input name="state" placeholder="State / Province" value={form.state} onChange={handleChange} />
            <input name="zip" placeholder="ZIP / Postal Code" value={form.zip} onChange={handleChange} />
          </div>
          <input name="country" placeholder="Country" value={form.country} onChange={handleChange} />

          <h3>Payment Options</h3>
          <div className="payment-options">
            <label>
              <input type="radio" name="paymentOption" checked={payment === 'card'} onChange={() => setPayment('card')} />
              💳 Card
            </label>
            <label>
              <input type="radio" name="paymentOption" checked={payment === 'upi'} onChange={() => setPayment('upi')} />
              📱 UPI
            </label>
            <label>
              <input type="radio" name="paymentOption" checked={payment === 'netbanking'} onChange={() => setPayment('netbanking')} />
              🏦 Netbanking
            </label>
          </div>

          <h3>Promo Code</h3>
          <div className="promo-row">
            <input
              type="text"
              placeholder="Enter promo code"
              value={promoInput}
              onChange={(e) => setPromoInput(e.target.value)}
            />
            <button
              type="button"
              className={promoApplied ? 'promo-btn applied' : 'promo-btn'}
              onClick={handleApplyPromo}
            >
              {promoApplied ? 'Applied' : 'Apply'}
            </button>
          </div>

          {error && <p className="checkout-error">{error}</p>}

          <button type="submit" className="continue-btn">Continue to Payment</button>
        </form>

        <div className="order-summary">
          <h3>Order Summary</h3>
          {cartItems.map((item) => (
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
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>${shipping.toFixed(2)}</span>
          </div>
          {promoApplied && (
            <div className="summary-row discount">
              <span>Discount</span>
              <span>-${discount.toFixed(2)}</span>
            </div>
          )}
          <div className="summary-row total">
            <span>Total</span>
            <span>${finalTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Checkout