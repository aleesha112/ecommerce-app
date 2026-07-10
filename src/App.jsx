import { Routes, Route, Link } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { CartProvider, useCart } from './context/CartContext'
import { AuthProvider, useAuth } from './context/AuthContext'
import Home from './pages/Home'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Wishlist from './pages/Wishlist'
import OrderHistory from './pages/OrderHistory'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ChatWidget from './components/ChatWidget'
import './App.css'
import { useState } from 'react'
import ForgotPassword from './pages/ForgotPassword'

function AppContent() {
  const { darkMode, toggleDarkMode } = useCart()
  const { user, logout } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className={darkMode ? "dark-mode" : ""}>
      <Toaster position="top-right" />
      
        <nav>
  <div className="nav-brand">MyStore</div>
  {user && <span className="mobile-username">Hi, {user.name}</span>}
 
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>
        
        

        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/wishlist" onClick={() => setMenuOpen(false)}>Wishlist</Link>
          <Link to="/cart" onClick={() => setMenuOpen(false)}>Cart</Link>
          <Link to="/orders" onClick={() => setMenuOpen(false)}>Orders</Link>
          {user ? (
            <>
              <span>Hi, {user.name}</span>
              <button onClick={() => { logout(); setMenuOpen(false) }} className="nav-logout-btn">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
              <Link to="/signup" onClick={() => setMenuOpen(false)}>Signup</Link>
            </>
          )}
          <label className="theme-switch">
            <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} />
            <span className="slider"></span>
          </label>
        </div>
      </nav>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/orders" element={<OrderHistory />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>

      <ChatWidget />
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </AuthProvider>
  )
}

export default App