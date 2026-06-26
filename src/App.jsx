import { Routes, Route, Link } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import Home from './pages/Home'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import './App.css'    

function App() {
  return (
    <CartProvider>
      <div>
        <nav>
          <Link to="/">Home</Link>
          {" | "}
          <Link to="/cart">Cart</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </div>
    </CartProvider>
  )
}

export default App