import { useNavigate } from 'react-router-dom'
import './Hero.css'

function Hero() {
  const navigate = useNavigate()

  return (
    <section
      className="hero"
      style={{ backgroundImage: `url(${new URL('../../assets/hero-vegetables.png', import.meta.url).href})` }}
    >
      <div className="hero-content">
        <h1 className="hero-title">
          <span className="text-green">Fresh And </span>
          <span className="text-orange">Organic </span>
          <span className="text-green">Products For You</span>
        </h1>
        <p className="hero-desc">
          Lorem ipsum Dolor,sit Amet Consectetur Adipisicing Elite.
          Earum Aials Volupats Labore Est.Dolorum Tenetur!
        </p>
        <button className="shop-now-btn" onClick={() => navigate('/categories')}>
          Shop Now
        </button>
      </div>
    </section>
  )
}

export default Hero