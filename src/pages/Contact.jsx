import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Contact.css'

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [subscribe, setSubscribe] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.message) {
      setError('Please fill in all fields.')
      return
    }
    if (!subscribe) {
      setError('Please check the box to continue.')
      return
    }

    setError('')

    const submission = { ...formData, date: new Date().toISOString() }
    const existing = JSON.parse(localStorage.getItem('groco_contact_submissions') || '[]')
    existing.push(submission)
    localStorage.setItem('groco_contact_submissions', JSON.stringify(existing))

    setSubmitted(true)
  }

  if (submitted) {
    return (
      <section className="contact-page">
        <div className="contact-inner">
          <div className="contact-success-card">
            <div className="success-icon">✓</div>
            <h2>Thank You, {formData.name}!</h2>
            <p>Your message has been received. We'll get back to you soon.</p>
            <Link to="/" className="home-btn">Go to Home</Link>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="contact-page">
      <div className="contact-inner">
        <h1 className="contact-heading">Contact Us</h1>

        <form className="contact-card" onSubmit={handleSubmit}>
          <h2 className="contact-card-title">
            Contact <span>Us</span>
          </h2>
          <p className="contact-card-sub">Let's get in touch!</p>

          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label htmlFor="message">contact</label>
            <textarea id="message" name="message" rows="3" value={formData.message} onChange={handleChange} />
          </div>

          <label className="newsletter-check">
            <input
              type="checkbox"
              checked={subscribe}
              onChange={(e) => setSubscribe(e.target.checked)}
            />
            I would like to revive newsletter
          </label>

          {error && <p className="form-error">{error}</p>}

          <button type="submit" className="contact-submit-btn">Submit</button>
        </form>
      </div>
    </section>
  )
}

export default Contact