import { createContext, useState, useContext } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])
  const [discountApplied, setDiscountApplied] = useState(false)
  const [wishlist, setWishlist] = useState([])

  function addToCart(product) {
    setCartItems([...cartItems, product])
  }

  function removeFromCart(indexToRemove) {
    setCartItems(cartItems.filter((item, index) => index !== indexToRemove))
  }

  function toggleWishlist(product) {
    const exists = wishlist.find((item) => item._id === product._id)
    if (exists) {
      setWishlist(wishlist.filter((item) => item._id !== product._id))
    } else {
      setWishlist([...wishlist, product])
    }
  }

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, discountApplied, setDiscountApplied, wishlist, toggleWishlist }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}