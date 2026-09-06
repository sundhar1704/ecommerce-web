import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Payment.css'

function generateExpiry() {
  const now = new Date()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const year = String(now.getFullYear() + 4).slice(-2)
  return `${month}/${year}`
}

function Payment() {
  const location = useLocation()
  const navigate = useNavigate()
  const { currentUser } = useAuth()
  const finalTotal = location.state?.finalTotal || 0

  const [cardName, setCardName] = useState(currentUser?.name || '')
  const [cardNumber, setCardNumber] = useState('')
  const [expiry] = useState(generateExpiry())
  const [cvv, setCvv] = useState('')
  const [error, setError] = useState('')

  const cvvKey = `groco_cvv_${currentUser?.email}`

  const handlePay = (e) => {
    e.preventDefault()
    setError('')

    const digitsOnly = cardNumber.replace(/\s/g, '')
    if (digitsOnly.length !== 16 || !/^\d+$/.test(digitsOnly)) {
      setError('Card number must be exactly 16 digits.')
      return
    }

    if (!/^\d{3}$/.test(cvv)) {
      setError('CVV must be 3 digits.')
      return
    }

    const storedCvv = localStorage.getItem(cvvKey)
    if (storedCvv) {
      if (cvv !== storedCvv) {
        setError('Incorrect CVV for this account.')
        return
      }
    } else {
      localStorage.setItem(cvvKey, cvv)
    }

    navigate('/order-confirmed')
  }

  return (
    <section className="payment-page">
      <div className="checkout-steps">
        <span className="step done">1 Shipping</span>
        <span className="step-line" />
        <span className="step active">2 Payment</span>
        <span className="step-line" />
        <span className="step">3 Confirm</span>
      </div>

      <h1 className="payment-heading">Payment details</h1>

      <div className="payment-card-box">
        <div className="payment-visual">
          <div className="credit-card">
            <div className="chip" />
            <p className="card-number-preview">
              {cardNumber ? cardNumber.padEnd(19, '•') : '•••• •••• •••• ••••'}
            </p>
            <div className="card-bottom-row">
              <span>{cardName || 'CARD HOLDER'}</span>
              <span>{expiry}</span>
            </div>
          </div>
          <p className="payment-amount">Payment amount <span>${finalTotal.toFixed(2)}</span></p>
        </div>

        <form className="payment-form" onSubmit={handlePay}>
          <label>Card holder name</label>
          <input value={cardName} onChange={(e) => setCardName(e.target.value)} />

          <label>Card Number</label>
          <input
            value={cardNumber}
            maxLength={19}
            onChange={(e) => {
              const digits = e.target.value.replace(/\D/g, '').slice(0, 16)
              const spaced = digits.replace(/(.{4})/g, '$1 ').trim()
              setCardNumber(spaced)
            }}
            placeholder="1234 5678 9012 3456"
          />

          <div className="form-row">
            <div>
              <label>Expiry date</label>
              <input value={expiry} readOnly />
            </div>
            <div>
              <label>CVV</label>
              <input
                value={cvv}
                maxLength={3}
                onChange={(e) => setCvv(e.target.value.replace(/\D/g, ''))}
              />
            </div>
          </div>

          {error && <p className="payment-error">{error}</p>}

          <div className="payment-btn-row">
            <button type="button" className="cancel-btn" onClick={() => navigate('/checkout')}>Cancel</button>
            <button type="submit" className="pay-now-btn">Pay Now</button>
          </div>
        </form>
      </div>

      <button className="back-link" onClick={() => navigate('/checkout')}>← Back</button>
    </section>
  )
}

export default Payment