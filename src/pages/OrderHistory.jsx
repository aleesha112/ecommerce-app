import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'

function OrderHistory() {
  const [orders, setOrders] = useState([])
  const { token } = useAuth()

  useEffect(() => {
    fetch("https://ecommerce-backend-production-5790.up.railway.app/api/orders", {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((response) => response.json())
      .then((data) => setOrders(data))
  }, [])

  return (
    <div className="order-history-page">
      <h1>Order History</h1>

      {orders.length === 0 ? (
        <div className="empty-cart">
          <div className="empty-cart-icon">📦</div>
          <h2>No orders yet</h2>
          <p>Once you place an order, it will show up here.</p>
          <Link to="/" className="continue-shopping">Start Shopping</Link>
        </div>
      ) : (
        orders.map((order) => (
          <div className="order-card" key={order._id}>
            <div className="order-header">
              <span>{order.fullName}</span>
              <span className={`status-badge status-${order.status?.toLowerCase()}`}>
                {order.status || "Processing"}
              </span>
              <span>{new Date(order.date).toLocaleDateString()}</span>
            </div>
            <p className="order-address">{order.address}</p>
            <div className="order-items">
              {order.items.map((item, index) => (
                <div key={index} className="order-item">
                  <span>{item.name}</span>
                  <span>${item.price}</span>
                </div>
              ))}
            </div>
            <div className="order-item">
              <span>Subtotal</span>
              <span>${order.subtotal}</span>
            </div>
            <div className="order-item">
              <span>Shipping</span>
              <span>${order.shipping}</span>
            </div>
            {Number(order.discount) > 0 && (
              <div className="order-item">
                <span>Discount</span>
                <span>-${order.discount}</span>
              </div>
            )}
            <div className="order-total">
              <span>Total</span>
              <span>${order.total}</span>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default OrderHistory   