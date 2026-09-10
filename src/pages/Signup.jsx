import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { User } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import './Auth.css'

const EMAIL_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^\s@]+@[^\s@]+\.[^\s@]+$/
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/

function Signup() {
  const [form, setForm] = useState({
    name: '', dob: '', email: '', password: '', confirmPassword: '',
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const { signup } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from || '/'

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!form.name || !form.dob || !form.email || !form.password || !form.confirmPassword) {
      setError('Please fill in all fields.')
      return
    }

    if (!EMAIL_REGEX.test(form.email)) {
      setError('Email must contain one uppercase letter, one lowercase letter, an @ symbol, and a number.')
      return
    }

    if (!PASSWORD_REGEX.test(form.password)) {
      setError('Password must be at least 8 characters with one uppercase letter, one lowercase letter, and a number.')
      return
    }

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    const result = signup(form)
    if (!result.success) {
      setError(result.message)
      return
    }

    setSuccess(true)
  }

  if (success) {
    return (
      <section className="auth-page">
        <div className="auth-card auth-success">
          <h2>Account created successfully!</h2>
          <p>Your email is ready to use — log in now.</p>
          <button className="auth-btn" onClick={() => navigate('/login', { state: { from } })}>
            Go to Login
          </button>
        </div>
      </section>
    )
  }

  return (
    <section className="auth-page">
      <h1 className="auth-heading">Create Account</h1>
      <div className="auth-card">
        <div className="auth-avatar">
          <User size={40} color="#555" />
        </div>

        <form onSubmit={handleSubmit}>
          <label className="auth-label">Name</label>
          <input
            type="text"
            name="name"
            className="auth-input"
            placeholder="Enter Your Name"
            value={form.name}
            onChange={handleChange}
          />

          <label className="auth-label">Date of Birth</label>
          <input
            type="date"
            name="dob"
            className="auth-input"
            value={form.dob}
            onChange={handleChange}
          />

          <label className="auth-label">Email-Id</label>
          <input
            type="text"
            name="email"
            className="auth-input"
            placeholder="Enter Your Mail-id"
            value={form.email}
            onChange={handleChange}
          />

          <label className="auth-label">Password</label>
          <input
            type="password"
            name="password"
            className="auth-input"
            placeholder="Enter Your Password"
            value={form.password}
            onChange={handleChange}
          />

          <label className="auth-label">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            className="auth-input"
            placeholder="Re-enter Your Password"
            value={form.confirmPassword}
            onChange={handleChange}
          />

          {error && <p className="auth-error">{error}</p>}

          <button type="submit" className="auth-btn">Create Account</button>
        </form>

        <p className="auth-footer-text">
          Already Have An Account{' '}
          <Link to="/login" state={{ from }} className="auth-link">Log In</Link>
        </p>
      </div>
    </section>
  )
}

export default Signup