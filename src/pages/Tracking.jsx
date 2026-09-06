import { useNavigate } from 'react-router-dom'
import { Truck, MessageCircle } from 'lucide-react'
import { useState } from 'react'
import SupportChat from '../components/layout/SupportChat'
import './Tracking.css'

function Tracking() {
  const navigate = useNavigate()
  const [showChat, setShowChat] = useState(false)

  const stored = JSON.parse(localStorage.getItem('groco_last_order') || 'null')
  if (!stored) {
    navigate('/')
    return null
  }

  const orderDate = new Date(stored.date)
  const now = new Date()
  const daysSinceOrder = Math.floor((now - orderDate) / (1000 * 60 * 60 * 24))
  const deliveryDate = new Date(orderDate)
  deliveryDate.setDate(deliveryDate.getDate() + 3)

  const steps = [
    { label: 'Order Placed', desc: `We received your order on ${orderDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}.`, done: daysSinceOrder >= 0 },
    { label: 'Processing', desc: 'Your order is being prepared for shipment.', done: daysSinceOrder >= 1 },
    { label: 'Shipped', desc: 'Your package has left the warehouse.', done: daysSinceOrder >= 2 },
    { label: 'Out for Delivery', desc: 'Your package is on the way to your address.', done: daysSinceOrder >= 3 },
    { label: 'Delivered', desc: 'Your package has been delivered.', done: daysSinceOrder >= 3 },
  ]

  const completedCount = steps.filter((s) => s.done).length
  const percent = Math.round((completedCount / steps.length) * 100)

  return (
    <section className="tracking-page">
      <h1 className="tracking-heading">Order Tracking</h1>

      <div className="tracking-card">
        <div className="delivery-box">
          <h3>Estimated Delivery</h3>
          <div className="delivery-row">
            <div>
              <p className="delivery-label">Your order is expected to arrive by</p>
              <p className="delivery-date">
                {deliveryDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
            <Truck size={32} color="var(--color-secondary)" />
          </div>
        </div>

        <div className="status-box">
          <div className="status-header">
            <h3>Order Status</h3>
            <span>{percent}% Complete</span>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${percent}%` }} />
          </div>

          {steps.map((step, i) => (
            <div className={step.done ? 'status-step done' : 'status-step'} key={i}>
              <span className="status-dot" />
              <div>
                <p className="status-label">{step.label}</p>
                <p className="status-desc">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="help-box">
          <h3>Need Help?</h3>
          <p>
            If you have any questions about your order, our support team is here to help.{' '}
            <button className="contact-support-link" onClick={() => setShowChat(true)}>
              <MessageCircle size={14} /> Contact Support
            </button>
          </p>
        </div>
      </div>

      {showChat && <SupportChat onClose={() => setShowChat(false)} />}
    </section>
  )
}

export default Tracking