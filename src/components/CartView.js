import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../context/UserContext';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ItemCard from './ItemCard';

export default function CartView(){

  const { user } = useContext(UserContext); 
  const [cart, setCart] = useState([]);
  console.log("cart",cart); // Check the initial value of the cart state
  
  const getCart = () => {
      
    fetch(`${process.env.REACT_APP_API_BASE_URL}/cart/get-cart`, {

      method: 'GET',
      headers: {
        Authorization: `Bearer ${ localStorage.getItem('token') }`,
      },
    })
    .then(res => res.json())
    .then(data => {
      console.log('API Response:',data);
      console.log('data.cart:', data.cart);

        if (Array.isArray(data.cart)) {
            console.log('Setting cart to:', data.cart); // Check the data being passed to setCart
            setCart(data.cart);
            } else {
              console.log('Setting cart to empty array'); // Check the data being passed to setCart
            setCart([]);;
        }
      })
      .catch(err => {
        console.error('Error fetching data:', err);
        setCart([]); // Fallback if fetch fails
      });
  };

    useEffect(() => {
      getCart();
      console.log("AFTER",cart); // Check the value of the cart state after getCart is called
    
    }, []);


      return (
        <>
            {user ? (
            cart.length > 0 ? (
                <>
                      <h1 className='text-center mt-5'>Cart</h1>
                        <Row>
                          {cart.map((item, index) => (
                            <Col md={3} key={index}>
                              <ItemCard item={item} />
                            </Col>
                          ))}
                        </Row>
                      </>
                    ) : (
                      <h1 className='text-center mt-5'>Your cart is empty! <Link to="/products">Start shopping.</Link></h1>
                    )

                  ) : null}
        </>
    );
}
