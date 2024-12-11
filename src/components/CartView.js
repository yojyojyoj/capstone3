import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../context/UserContext';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ItemCard from './ItemCard';

export default function CartView(){

  const { user } = useContext(UserContext); 
  const [cart, setCart] = useState([]);
  
  const getCart = () => {
      
    fetch(`${process.env.REACT_APP_API_BASE_URL}/cart/get-cart`, {

      method: 'GET',
      headers: {
        Authorization: `Bearer ${ localStorage.getItem('token') }`,
      },
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);

        if (Array.isArray(data.cart)) {
            setCart(data.cart);
            } else {
            setCart([]);;
        }
      })
      .catch(err => {
        console.error('Error fetching data:', err);
        setCart([]); // Fallback if fetch fails
      });
  };

    useEffect(() => {

    getCart()

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
                              <ItemCard product={item} />
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
