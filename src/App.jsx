import { Routes, Route, Link } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import Home from './pages/Home'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Wishlist from './pages/Wishlist'
import OrderHistory from './pages/OrderHistory'
import ChatWidget from './components/ChatWidget'
import './App.css'

function App() {
  return (
    <CartProvider>
      <div>
        <nav>
          <Link to="/">Home</Link>
          {" | "}
          <Link to="/wishlist">Wishlist</Link>
          {" | "}
          <Link to="/cart">Cart</Link>
          {" | "}
          <Link to="/orders">Orders</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/orders" element={<OrderHistory />} />
        </Routes>

        <ChatWidget />
      </div>
    </CartProvider>
  )
}

export default App