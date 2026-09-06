import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { User } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import './Auth.css'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    const result = login(email, password)
    if (!result.success) {
      setError(result.message)
      return
    }
    navigate('/')
  }

  return (
    <section className="auth-page">
      <h1 className="auth-heading">Log In Now</h1>
      <div className="auth-card">
        <div className="auth-avatar">
          <User size={40} color="#555" />
        </div>

        <form onSubmit={handleSubmit}>
          <label className="auth-label">Email-Id</label>
          <input
            type="text"
            className="auth-input"
            placeholder="Enter Your Mail-id"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="auth-label">Password</label>
          <input
            type="password"
            className="auth-input"
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="auth-error">{error}</p>}

          <button type="submit" className="auth-btn">Log In</button>
        </form>

        <p className="auth-footer-text">
          Don't Have An Account <Link to="/signup" className="auth-link">Create Now?</Link>
        </p>
      </div>
    </section>
  )
}

export default Login