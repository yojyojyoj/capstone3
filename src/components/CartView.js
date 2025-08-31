import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../context/UserContext';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Button, InputGroup, FormControl, Row, Col } from 'react-bootstrap';

export default function CartView() {
  const { user } = useContext(UserContext);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const getCart = () => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/cart/get-cart`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data?.cart) {
          setCartItems(data.cart.cartItems || []);
          setTotalPrice(data.cart.totalPrice || 0);
        } else {
          setCartItems([]);
          setTotalPrice(0);
        }
      })
      .catch(err => {
        console.error('Error fetching data:', err);
        setCartItems([]);
        setTotalPrice(0);
      });
  };

  useEffect(() => {
    getCart();
  }, []);

  const updateCartQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Quantity',
        text: 'Quantity must be at least 1.',
      });
      return;
    }

    // Optimistically update the local state for the quantity change
    setCartItems(prevItems =>
      prevItems.map(item =>
        item._id === productId ? { ...item, quantity: newQuantity } : item
      )
    );

    // Send the updated quantity to the backend
    fetch(`${process.env.REACT_APP_API_BASE_URL}/cart/update-cart-quantity`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        productId: productId,
        newQuantity: newQuantity, // Send newQuantity, matching backend's expected field
      }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.message === "Item or product not found.") {
          Swal.fire({
            icon: 'error',
            title: 'Update Failed',
            text: data.message,
          });
          // Revert the local state if backend update fails
          getCart(); // Refresh the cart from the backend in case of failure
        } else {
          Swal.fire({
            icon: 'success',
            title: 'Quantity Updated',
          });
          getCart(); // Refresh the cart after successful update
        }
      })
      .catch(() => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to update cart quantity.',
        });
        // Refresh the cart from the backend if an error occurs
        getCart();
      });
  };

  const removeFromCart = (productId) => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/cart/${productId}/remove-from-cart`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data.message === 'Item not found in cart') {
          Swal.fire({
            icon: 'error',
            title: 'Removal Failed',
            text: data.message,
          });
        } else {
          Swal.fire({
            icon: 'success',
            title: 'Item Removed',
          });
          getCart();
        }
      });
  };

  // Handle checkout
  const handleCheckout = () => {
    if (!user?.id) {
      Swal.fire({
        icon: 'error',
        title: 'Please Login',
        text: 'You need to be logged in to checkout!',
      });
      return;
    }

    if (cartItems.length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Empty Cart',
        text: 'Your cart is empty! Add items to the cart before proceeding.',
      });
      return;
    }

    fetch(`${process.env.REACT_APP_API_BASE_URL}/checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === 'Ordered Successfully') {
          Swal.fire({
            icon: 'success',
            title: 'Checkout Successful',
            text: 'Your order has been placed!',
          });
          // Optionally, you can clear the cart here by calling getCart()
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Checkout Failed',
            text: data.message || 'There was an issue with your checkout.',
          });
        }
      })
    /*  .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Something went wrong during checkout. Please try again later.',
        });
      });*/
  };

  // Handle clear cart
  const handleClearCart = () => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/cart/clear-cart`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data.message === 'Cart cleared successfully') {
          Swal.fire({
            icon: 'success',
            title: 'Cart Cleared',
            text: 'Your cart has been cleared successfully.',
          });
          getCart(); // Refresh the cart after clearing
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Clear Cart Failed',
            text: data.message || 'There was an issue clearing the cart.',
          });
        }
      })
      /*.catch(() => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Something went wrong while clearing the cart. Please try again later.',
        });
      });*/
  };

  return (
    <>
      {user ? (
        cartItems.length > 0 ? (
          <>
            <h1 className="text-center mt-5">My Cart</h1>
            <div className="table-responsive mt-4">
              <table className="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Subtotal</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((data, index) => (
                    <tr key={data._id}>
                      
                      <td>{data.productId?.name || 'Unnamed Product'}</td>
                      <td>
                        {data.productId?.price
                          ? `₱${data.productId.price.toFixed(2)}`
                          : 'N/A'}
                      </td>
                      <td>
                        <InputGroup className="mb-3">
                          <Button
                            variant="outline-secondary"
                            onClick={() => updateCartQuantity(data._id, data.quantity - 1)}
                          >
                            -
                          </Button>
                          <FormControl
                            aria-label="Quantity"
                            value={data.quantity}
                            readOnly
                          />
                          <Button
                            variant="outline-secondary"
                            onClick={() => updateCartQuantity(data._id, data.quantity + 1)}
                          >
                            +
                          </Button>
                        </InputGroup>
                      </td>
                      <td>₱{data.subtotal.toFixed(2)}</td>
                      <td>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => removeFromCart(data._id)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="2">
                      {/* Checkout Button */}
              <div className="text-center mt-4">
                <Button variant="success" onClick={handleCheckout}>
                  Proceed to Checkout
                </Button>
              </div>
                    </td>
                    <td colSpan="2" className="text-end">
                      <strong>Total Price:</strong>
                    </td>
                    <td colSpan="4">
                      <strong>₱{totalPrice.toFixed(2)}</strong>
                    </td>
                  </tr>
                </tfoot>
              </table>
              
              {/* Clear Cart Button */}
              <div className="text-start mt-3">
                <Button variant="danger" onClick={handleClearCart}>
                  Clear Cart
                </Button>
              </div>
            </div>
          </>
        ) : (
          <h1 className="text-center mt-5">
            Your cart is empty! <Link to="/products">Start shopping.</Link>
          </h1>
        )
      ) : null}
    </>
  );
}
