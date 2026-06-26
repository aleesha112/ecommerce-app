import { createContext, useState, useContext } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])
  const [discountApplied, setDiscountApplied] = useState(false)

  function addToCart(product) {
    setCartItems([...cartItems, product])
  }

  function removeFromCart(indexToRemove) {
    setCartItems(cartItems.filter((item, index) => index !== indexToRemove))
  }

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, discountApplied, setDiscountApplied }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}