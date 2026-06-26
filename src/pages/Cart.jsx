import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { Link } from 'react-router-dom'

function Cart() {
  const { cartItems, removeFromCart } = useCart()
  const [discountCode, setDiscountCode] = useState("")
  const { cartItems, removeFromCart, discountApplied, setDiscountApplied } = useCart()
  const [discountMessage, setDiscountMessage] = useState("")

  const totalPrice = cartItems.reduce((sum, item) => sum + Number(item.price), 0)
  const shippingFee = cartItems.length > 0 ? 10 : 0
  const discountAmount = discountApplied ? totalPrice * 0.1 : 0
  const grandTotal = totalPrice + shippingFee - discountAmount

  function applyDiscount() {
    if (discountCode.toUpperCase() === "SAVE10") {
      setDiscountApplied(true)
      setDiscountMessage("10% discount applied!")
    } else {
      setDiscountApplied(false)
      setDiscountMessage("Invalid discount code")
    }
  }

  return (
    <div className="cart-page">
      <h1>Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <Link to="/" className="continue-shopping">Continue Shopping</Link>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items">
            {cartItems.map((item, index) => (
              <div key={index} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-img" />
                <div className="cart-item-info">
                  <h3>{item.name}</h3>
                  <p>${item.price}</p>
                </div>
                <button onClick={() => removeFromCart(index)} className="remove-btn">Remove</button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Order Summary</h2>

            <div className="discount-box">
              <input
                type="text"
                placeholder="Discount code"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
              />
              <button onClick={applyDiscount}>Apply</button>
            </div>
            {discountMessage && <p className="discount-message">{discountMessage}</p>}

            <div className="summary-row">
              <span>Subtotal</span>
              <span>${totalPrice}</span>
            </div>
            <div className="summary-row">
              <span>Shipping Fee</span>
              <span>${shippingFee}</span>
            </div>
            {discountApplied && (
              <div className="summary-row discount">
                <span>Discount (10%)</span>
                <span>-${discountAmount.toFixed(2)}</span>
              </div>
            )}
            <div className="summary-row total">
              <span>Total</span>
              <span>${grandTotal.toFixed(2)}</span>
            </div>
            <Link to="/checkout" className="checkout-btn">Proceed to Checkout</Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart