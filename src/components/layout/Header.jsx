import { useState } from 'react'
import { Search, ShoppingCart, User, ShoppingBag, Menu, X, LogOut } from 'lucide-react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useCart } from '../../context/CartContext'
import SearchBar from './SearchBar'
import './Header.css'

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const { currentUser, logout } = useAuth()
  const { totalItems } = useCart()
  const navigate = useNavigate()

  const closeMenu = () => setMenuOpen(false)

  const handleProfileClick = () => {
    if (!currentUser) {
      navigate('/login')
    } else {
      setProfileOpen(!profileOpen)
    }
  }

  const handleLogout = () => {
    logout()
    setProfileOpen(false)
    navigate('/')
  }

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <ShoppingBag size={22} color="var(--color-secondary)" />
          <span>GroCo</span>
        </div>

        <nav className={`nav ${menuOpen ? 'nav-open' : ''}`}>
          <NavLink to="/" className="nav-link" onClick={closeMenu}>Home</NavLink>
          <NavLink to="/about" className="nav-link" onClick={closeMenu}>About Us</NavLink>
          <NavLink to="/categories" className="nav-link" onClick={closeMenu}>Categories</NavLink>
          <NavLink to="/contact" className="nav-link" onClick={closeMenu}>Contact</NavLink>
        </nav>

        <div className="header-icons">
          <button className="icon-btn" onClick={() => setSearchOpen(true)} aria-label="Search">
            <Search size={20} />
          </button>

          <NavLink to="/cart" className="cart-icon-wrap">
            <ShoppingCart size={20} />
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </NavLink>

          <div className="profile-wrap">
            <button className="profile-btn" onClick={handleProfileClick} aria-label="Account">
              <User size={20} />
            </button>

            {profileOpen && currentUser && (
              <div className="profile-dropdown">
                <p className="profile-name">{currentUser.name}</p>
                <p className="profile-email">{currentUser.email}</p>
                <button className="logout-btn" onClick={handleLogout}>
                  <LogOut size={16} /> Log Out
                </button>
              </div>
            )}
          </div>

          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {searchOpen && <SearchBar onClose={() => setSearchOpen(false)} />}
    </header>
  )
}

export default Header