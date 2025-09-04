import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../context/UserContext';
import Swal from 'sweetalert2';

export default function MyOrders() {
  const { user } = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) {
      setLoading(false);
      return;
    }

    fetch(`${process.env.REACT_APP_API_BASE_URL}/orders/my-orders`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(async (res) => {
        const data = await res.json();

        if (res.ok) {
          setOrders(data.orders);
        } else if (res.status === 404) {
          Swal.fire({
            icon: 'info',
            title: 'No Orders',
            text: data.message || 'You have no orders yet.',
          });
          setOrders([]);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: data.message || 'Failed to fetch your orders.',
          });
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching orders:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Something went wrong while fetching orders.',
        });
        setLoading(false);
      });
  }, [user]);

  if (!user?.id) {
    return <p>Please log in to view your orders.</p>;
  }

  if (loading) {
    return <p>Loading your orders...</p>;
  }

  if (orders.length === 0) {
    return <p>You have no orders yet.</p>;
  }

  return (
    <div className="my-orders-container">
      <h2>My Orders</h2>
      {orders.map((order) => (
        <div key={order._id} className="order-card" style={{border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem'}}>
          <h4>Order ID: {order._id}</h4>
          <p><strong>Total Price:</strong> ₱{order.totalPrice.toFixed(2)}</p>
          <p><strong>Products Ordered:</strong></p>
          <ul>
            {order.productsOrdered.map((product, idx) => (
              <li key={idx}>
                Product ID: {product.productId} — Quantity: {product.quantity} — Subtotal: ₱{product.subtotal.toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
