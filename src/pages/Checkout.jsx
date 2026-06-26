import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'

function Checkout() {
  const { cartItems } = useCart()
  const navigate = useNavigate()

  const [fullName, setFullName] = useState("")
  const [address, setAddress] = useState("")
  const [houseNumber, setHouseNumber] = useState("")
  const [postalCode, setPostalCode] = useState("")
  const [city, setCity] = useState("")
  const [phone, setPhone] = useState("")

  const totalPrice = cartItems.reduce((sum, item) => sum + Number(item.price), 0)

  function handlePlaceOrder(e) {
    e.preventDefault()
    alert(`Order placed successfully for ${fullName}! Total: $${totalPrice}`)
    navigate("/")
  }

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>

      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={handlePlaceOrder}>
          <h2>Shipping Details</h2>

          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="House Number"
            value={houseNumber}
            onChange={(e) => setHouseNumber(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Street Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Postal Code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />

          <button type="submit">Place Order</button>
        </form>

        <div className="checkout-summary">
          <h2>Order Summary</h2>
          {cartItems.map((item, index) => (
            <div key={index} className="checkout-item">
              <span>{item.name}</span>
              <span>${item.price}</span>
            </div>
          ))}
          <div className="checkout-total">
            <span>Total</span>
            <span>${totalPrice}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout