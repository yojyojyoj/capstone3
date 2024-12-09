import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../context/UserContext';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ItemCard from '../components/ItemCard';

export default function Cart() {
  const { user } = useContext(UserContext);
  const [cart, setCart] = useState([]);

  // Fetch cart data
  const getCart = () => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/cart`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.cart)) {
          setCart(data.cart);
        } else {
          setCart([]);
        }
      })
      .catch((err) => {
        console.error('Error fetching cart data:', err);
        setCart([]);
      });
  };

  useEffect(() => {
    if (user) {
      getCart(); // Only fetch cart if user is logged in
    }
  }, [user]);

  // Handle remove item from cart
  const removeFromCart = (itemId) => {
    // Logic to remove the item from the cart (could involve calling an API)
    setCart(cart.filter((item) => item.id !== itemId)); // Example of removing item from state
  };

  return (
    <>
      {user ? (
        cart.length > 0 ? (
          <>
            <h1 className='text-center mt-5'>Your Cart</h1>
            <Row>
              {cart.map((item, index) => (
                <Col md={3} key={index}>
                  <ItemCard product={item} />
                  <Button
                    variant='danger'
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </Button>
                </Col>
              ))}
            </Row>
            <div className='text-center mt-4'>
              <Link to="/checkout">
                <Button variant="primary">Proceed to Checkout</Button>
              </Link>
            </div>
          </>
        ) : (
          <h1>Your cart is empty! <Link to="/products">Start shopping.</Link></h1>
        )
      ) : (
        <h1>Please log in to view your cart.</h1>
      )}
    </>
  );
}
