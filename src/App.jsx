import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import About from './pages/About'
import CategoryShop from './pages/CategoryShop'
import Contact from './pages/Contact'
import Cart from './pages/Cart'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Checkout from './pages/Checkout'
import Payment from './pages/Payment'
import OrderConfirmed from './pages/OrderConfirmed'
import Tracking from './pages/Tracking'
import ProductDetail from './pages/ProductDetail'
import BlogDetail from './pages/BlogDetail'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/categories" element={<CategoryShop />} />
        <Route path="/categories/:slug" element={<CategoryShop />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/order-confirmed" element={<OrderConfirmed />} />
        <Route path="/tracking" element={<Tracking />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
      </Route>
    </Routes>
  )
}

export default App