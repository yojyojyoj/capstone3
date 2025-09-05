import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Button, InputGroup, FormControl } from 'react-bootstrap';

export default function CartView() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [products, setProducts] = useState({}); // productId => { name, price }

  // Fetch active products for name & price mapping
  const fetchAllProducts = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/products/active`);
      const data = await res.json();
      if (res.ok) {
        const productMap = {};
        data.forEach(product => {
          productMap[product._id] = {
            name: product.name,
            price: product.price
          };
        });
        setProducts(productMap);
      } else {
        console.warn('Could not fetch products');
      }
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

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
    fetchAllProducts(); // Also fetch product data
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

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.productId === productId ? { ...item, quantity: newQuantity } : item
      )
    );

    fetch(`${process.env.REACT_APP_API_BASE_URL}/cart/update-cart-quantity`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        productId: productId,
        newQuantity: newQuantity,
      }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.message === "Item quantity updated successfully.") {
          Swal.fire({
            icon: 'success',
            title: 'Quantity Updated',
            text: data.message,
          });
          getCart();
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Update Failed',
            text: data.message,
          });
          getCart();
        }
      });
  };

  const removeFromCart = (productId) => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/cart/${productId}/remove-from-cart`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(async (res) => {
        const data = await res.json();

        if (res.ok && data.message === 'Item removed from cart successfully') {
          Swal.fire({
            icon: 'success',
            title: 'Item Removed',
            text: data.message,
          });
          getCart();
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Removal Failed',
            text: data.message || 'Could not remove item from cart.',
          });
        }
      })
      .catch((err) => {
        console.error('Error removing item from cart:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Something went wrong while removing the item. Please try again later.',
        });
      });
  };

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

    fetch(`${process.env.REACT_APP_API_BASE_URL}/orders/checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(async (res) => {
        const data = await res.json();

        if (res.ok && data.message === 'Ordered Successfully') {
          Swal.fire({
            icon: 'success',
            title: 'Checkout Successful',
            text: 'Your order has been placed!',
          });
          handleCheckClear();
          navigate('/orders/my-orders');
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Checkout Failed',
            text: data.message || 'There was an issue with your checkout.',
          });
        }
      })
      .catch((error) => {
        console.error('Checkout error:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Something went wrong during checkout. Please try again later.',
        });
      });
  };

  const handleCheckClear = () => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/cart/clear-cart`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(async (res) => {
        const data = await res.json();

        if (res.ok && data.message === 'Cart cleared successfully') {
          Swal.fire({
            icon: 'success',
            title: 'Successfully Checked Out',
            text: 'Your order has been placed successfully.',
          });
          getCart();
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Clear Cart Failed',
            text: data.message || 'There was an issue clearing the cart.',
          });
        }
      })
      .catch((err) => {
        console.error('Error clearing cart:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Something went wrong while clearing the cart. Please try again later.',
        });
      });
  };

  const handleClearCart = () => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/cart/clear-cart`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(async (res) => {
        const data = await res.json();

        if (res.ok && data.message === 'Cart cleared successfully') {
          Swal.fire({
            icon: 'success',
            title: 'Cart Cleared',
            text: 'Your cart has been cleared successfully.',
          });
          getCart();
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Clear Cart Failed',
            text: data.message || 'There was an issue clearing the cart.',
          });
        }
      })
      .catch((err) => {
        console.error('Error clearing cart:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Something went wrong while clearing the cart. Please try again later.',
        });
      });
  };

  return (
    <>
      {user ? (
        cartItems.length > 0 ? (
          <>
            <h1 className="text-center mt-5"
                style={{ color: 'rgb(63, 41, 43)' }}
>
              My Cart
            </h1>

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
                  {cartItems.map((data, index) => {
                    const product = products[data.productId] || {};
                    return (
                      <tr key={data._id}>
                        <td>{product.name || 'Unknown Product'}</td>
                        <td>
                          {product.price !== undefined
                            ? `₱${product.price.toFixed(2)}`
                            : 'N/A'}
                        </td>
                        <td>
                          <InputGroup className="mb-2 justify-content-center" style={{ maxWidth: '180px' }}>
                            <Button
                              variant="outline-secondary"
                              onClick={() => updateCartQuantity(data.productId, data.quantity - 1)}
                            >
                              -
                            </Button>
                            <FormControl
                              className="text-center"
                              aria-label="Quantity"
                              value={data.quantity}
                              readOnly
                              style={{ maxWidth: '60px' }}
                            />
                            <Button
                              variant="outline-secondary"
                              onClick={() => updateCartQuantity(data.productId, data.quantity + 1)}>
                              +
                            </Button>
                          </InputGroup>
                        </td>
                        <td>₱{data.subtotal?.toFixed(2)}</td>
                        <td>
                          <button
                            className="btn btn-md text-light"
                            style={{ backgroundColor: 'rgb(230, 138, 117)', border: 'none' }}
                            onClick={() => removeFromCart(data.productId)}>
                            Remove
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr>

                    <td colSpan="2">
                      <div className="text-center">
                        <Button 
                          style={{ backgroundColor: 'rgb(160, 186, 139)', border: 'none' }}
                          onClick={handleCheckout}>
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

              <div className="text-start mt-3">
                <Button style={{ backgroundColor: 'rgb(114, 158, 161)', border: 'none' }}
                  onClick={handleClearCart}>
                  Clear Cart
                </Button>
              </div>
            </div>
          </>
        ) : (
          <h4 className="text-center mt-5">
            Your cart is empty! 
            <div className="text-center mt-4">
              <Button style={{ backgroundColor: 'rgb(160, 186, 139)', border: 'none' }}
                  onClick={() => navigate('/products')}>
                    Start shopping
              </Button>
            </div>
          </h4>

        )
      ) : null}
    </>
  );
}
