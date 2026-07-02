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

function AppContent() {
  const { darkMode, toggleDarkMode } = useCart()
  const { user, logout } = useAuth()

  return (
    <div className={darkMode ? "dark-mode" : ""}>
      <Toaster position="top-right" />
      <nav>
        <Link to="/">Home</Link>
        {" | "}
        <Link to="/wishlist">Wishlist</Link>
        {" | "}
        <Link to="/cart">Cart</Link>
        {" | "}
        <Link to="/orders">Orders</Link>
        {" | "}
        {user ? (
          <>
            <span>Hi, {user.name}</span>
            {" | "}
            <button onClick={logout} className="nav-logout-btn">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            {" | "}
            <Link to="/signup">Signup</Link>
          </>
        )}
        <label className="theme-switch">
          <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} />
          <span className="slider"></span>
        </label>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/orders" element={<OrderHistory />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
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