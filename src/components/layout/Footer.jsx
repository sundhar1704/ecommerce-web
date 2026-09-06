import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingBag } from 'lucide-react'
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa'
import './Footer.css'

function Footer() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('') // '' | 'success' | 'error'

  const handleSubscribe = (e) => {
    e.preventDefault()

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

    if (!isValidEmail) {
      setStatus('error')
      return
    }

    const existing = JSON.parse(localStorage.getItem('groco_newsletter_emails') || '[]')
    if (!existing.includes(email)) {
      existing.push(email)
      localStorage.setItem('groco_newsletter_emails', JSON.stringify(existing))
    }

    setStatus('success')
    setEmail('')

    setTimeout(() => setStatus(''), 4000)
  }

  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-col">
          <div className="footer-logo">
            <ShoppingBag size={20} color="var(--color-secondary)" />
            <span>GroCo</span>
          </div>
          <p>Lorem Ipsum Dolor,sit Amet Consectetur Adipisicing Elite Earum Aials Volupats Labore Est.Dolorum Tenetur!</p>
          <div className="footer-socials">
            <FaFacebookF size={14} />
            <FaTwitter size={14} />
            <FaInstagram size={14} />
            <FaLinkedinIn size={14} />
          </div>
        </div>

        <div className="footer-col">
          <h4>Contact Info</h4>
          <p>📞 +123-9887-0987</p>
          <p>📞 +123-9887-0987</p>
          <p>✉️ goyouthi@gmail.com</p>
          <p>📍 Mumbai ,India-9889876</p>
        </div>

        <div className="footer-col">
          <h4>Quick Link</h4>
          <Link to="/" className="footer-link">Home</Link>
          <Link to="/#features" className="footer-link">Features</Link>
          <Link to="/#products" className="footer-link">Products</Link>
          <Link to="/categories" className="footer-link">Categories</Link>
          <Link to="/#reviews" className="footer-link">Review</Link>
          <Link to="/#blog" className="footer-link">Blog</Link>
        </div>

        <div className="footer-col">
          <h4>Newsletter</h4>
          <p>Subscribe For Latest Updates</p>
          <form className="newsletter-form" onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Enter Your Email"
              className="newsletter-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" className="subscribe-btn">Subscribe</button>
          </form>
          {status === 'success' && <p className="newsletter-msg success">Subscribed successfully!</p>}
          {status === 'error' && <p className="newsletter-msg error">Please enter a valid email.</p>}
        </div>
      </div>
    </footer>
  )
}

export default Footer