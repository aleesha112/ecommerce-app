import { useState, useEffect } from 'react'

function OrderHistory() {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    fetch("https://ecommerce-backend-production-a8b5.up.railway.app/api/orders")
      .then((response) => response.json())
      .then((data) => {
        setOrders(data)
      })
  }, [])

  return (
    <div className="order-history-page">
      <h1>Order History</h1>

      {orders.length === 0 ? (
        <div className="empty-cart">
          <p>No orders yet</p>
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