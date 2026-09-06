import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Hero from '../components/layout/Hero'
import Features from '../components/layout/Features'
import Products from '../components/product/Products'
import Categories from '../components/layout/Categories'
import Reviews from '../components/layout/Reviews'
import Blog from '../components/layout/Blog'

function Home() {
  const location = useLocation()

  useEffect(() => {
    if (location.hash === '#products') {
      const el = document.getElementById('products')
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }, [location])

  return (
    <>
      <Hero />
      <Features />
      <Products />
      <Categories />
      <Reviews />
      <Blog />
    </>
  )
}

export default Home