import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../context/UserContext';
import Swal from 'sweetalert2';

export default function MyOrders() {
  const { user } = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState({}); // Store productId -> name mapping
  const [loading, setLoading] = useState(true);

  // Fetch all products once
  const fetchAllProducts = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/products/active`);
      const data = await res.json();
      if (res.ok) {
        // Map productId -> name
        const productMap = {};
        data.forEach(product => {
          productMap[product._id] = product.name;
        });
        setProducts(productMap);
      } else {
        console.warn('Could not fetch products');
      }
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  // Fetch user orders
  const fetchOrders = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/orders/my-orders`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        setOrders(data.orders);
      } else if (res.status === 404) {
        Swal.fire({
          icon: 'info',
          title: 'No Orders',
          text: data.message || 'You have no orders yet.',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: data.message || 'Failed to fetch your orders.',
        });
      }
    } catch (err) {
      console.error('Error fetching orders:', err);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Something went wrong while fetching orders.',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id) {
      Promise.all([fetchOrders(), fetchAllProducts()]);
    } else {
      setLoading(false);
    }
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
      <h2 className="text-center py-5">My Order History</h2>
      {orders.map((order) => (
        <div
          key={order._id}
          className="order-card py-3"
          style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}
        >
          {/*<h4>Order ID: {order._id}</h4>*/}
          <p>
            <strong>Ordered On:</strong> {new Date(order.orderedOn).toLocaleDateString()}<br />
            <strong>Status:</strong> {order.status}<br />
            <strong>Total Price:</strong> ₱{order.totalPrice.toFixed(2)}
          </p>

          <p><strong>Products Ordered:</strong></p>
          <ul>
            {order.productsOrdered.map((product, idx) => (
              <li key={idx}>
                <div>
                Product: <strong>{products[product.productId] || 'Unknown Product'}</strong>
                </div>
                <div style={{ fontSize: '0.9rem', color: '#666' }}>Quantity: {product.quantity}</div>
                <div style={{ fontSize: '0.9rem', color: '#666' }}>Subtotal: ₱{product.subtotal.toFixed(2)}</div><br/>
              </li>

            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
