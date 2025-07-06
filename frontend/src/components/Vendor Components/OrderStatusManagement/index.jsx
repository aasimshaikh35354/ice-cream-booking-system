import React, { useState, useEffect } from 'react';
import './OrderStatusManagement.css';

const OrderStatus = () => {
  const [orders, setOrders] = useState([]);
  const [deliveryBoys, setDeliveryBoys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // ✅ Fetch Orders from Backend
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/orders');
        if (!response.ok) throw new Error('Failed to fetch orders');
        const data = await response.json();
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    const fetchDeliveryBoys = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/delivery-boys");
        if (!response.ok) throw new Error("Failed to fetch delivery boys");
        const data = await response.json();
        setDeliveryBoys(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchOrders();
    fetchDeliveryBoys();
  }, []);

  // ✅ Update Order Status
  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/api/orders/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) throw new Error('Failed to update order status');

      const updatedOrder = await response.json();
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === id ? { ...order, status: updatedOrder.status } : order
        )
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAssignDeliveryBoy = async (orderId, deliveryBoyId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/orders/${orderId}/assign`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ deliveryBoyId }),
        }
      );

      if (!response.ok) throw new Error("Failed to assign delivery boy");

      const updatedOrder = await response.json();
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, deliveryBoy: updatedOrder.deliveryBoy } : order
        )
      );
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <div className="order-status-container">
      <h1 className="heading">Order Status</h1>

      {loading ? (
        <p>Loading orders...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <div className="order-table">
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Products</th>
                <th>Total Amount</th>
                <th>Status</th>
                <th>Update</th>
                <th>Delivery Boy</th>
                <th>Delivery Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>
                    <ul>
                      {order.products.map((product) => (
                        <li key={product.productId}>
                          <img
                            src={product.imageUrl || 'fallback-image.jpg'}
                            alt={product.name}
                            className="product-img"
                          />
                          {product.name} (x{product.quantity})
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>₹{order.amount}</td>
                  <td className={`status ${order.status.toLowerCase()}`}>
                    {order.status}
                  </td>
                  <td>
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td>{order.deliveryBoy ? order.deliveryBoy.name : "Not Assigned"}</td>
                  <td>
                    <select
                      onChange={(e) => handleAssignDeliveryBoy(order._id, e.target.value)}
                      defaultValue={order.deliveryBoy ? order.deliveryBoy._id : ""}
                    >
                      <option value="">Select Delivery Boy</option>
                      {deliveryBoys.map((boy) => (
                        <option key={boy._id} value={boy._id}>
                          {boy.name}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrderStatus;
