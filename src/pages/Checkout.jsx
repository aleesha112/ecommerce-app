import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'

function Checkout() {
  const { cartItems, discountApplied, setCartItems } = useCart()
  const navigate = useNavigate()

  const [fullName, setFullName] = useState("")
  const [address, setAddress] = useState("")
  const [houseNumber, setHouseNumber] = useState("")
  const [postalCode, setPostalCode] = useState("")
  const [city, setCity] = useState("")
  const [phone, setPhone] = useState("")

  const totalPrice = cartItems.reduce((sum, item) => sum + Number(item.price), 0)
  const shippingFee = cartItems.length > 0 ? 10 : 0
  const discountAmount = discountApplied ? totalPrice * 0.1 : 0
  const grandTotal = totalPrice + shippingFee - discountAmount

  function handlePlaceOrder(e) {
  e.preventDefault()
  console.log("DEBUG - discountAmount:", discountAmount, "subtotal:", totalPrice)

  const orderData = {
    fullName,
    address: `${houseNumber}, ${address}, ${city}`,
    postalCode,
    phone,
    items: cartItems,
    subtotal: totalPrice.toFixed(2),
    discount: discountAmount.toFixed(2),
    shipping: shippingFee,
    total: grandTotal.toFixed(2)
  }

  fetch("https://ecommerce-backend-production-a8b5.up.railway.app/api/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderData)
  })
    .then((response) => response.json())
    .then(() => {
      alert(`Order placed successfully for ${fullName}! Total: $${grandTotal.toFixed(2)}`)
      setCartItems([])
      navigate("/")
    })
}
  
    return (
    <div className="checkout-page">
      <h1>Checkout TEST123</h1>

      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={handlePlaceOrder}>
          <h2>Shipping Details</h2>

          <input type="text" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
          <input type="text" placeholder="House Number" value={houseNumber} onChange={(e) => setHouseNumber(e.target.value)} required />
          <input type="text" placeholder="Street Address" value={address} onChange={(e) => setAddress(e.target.value)} required />
          <input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} required />
          <input type="text" placeholder="Postal Code" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required />
          <input type="text" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} required />

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
          <div className="checkout-item">
            <span>Shipping Fee</span>
            <span>${shippingFee}</span>
          </div>
          {discountApplied && (
            <div className="checkout-item">
              <span>Discount (10%)</span>
              <span>-${discountAmount.toFixed(2)}</span>
            </div>
          )}
          <div className="checkout-total">
            <span>Total</span>
            <span>${grandTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout