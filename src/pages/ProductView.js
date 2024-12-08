import { Container, Row, Col, Card, Button, InputGroup, FormControl } from 'react-bootstrap';
import { useState, useEffect, useContext } from 'react';
import { Notyf } from 'notyf';
import UserContext from '../context/UserContext';
import { useParams, Link } from 'react-router-dom';

export default function ProductView() {
  // Create an instance of Notyf for notifications
  const notyf = new Notyf();

  const { productId } = useParams();
  const { user } = useContext(UserContext);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // Fetch product data when the component mounts
    fetch(`${process.env.REACT_APP_API_BASE_URL}/products/${productId}`)
      .then(response => response.json())
      .then(data => {
        setName(data.name);
        setDescription(data.description);
        setPrice(data.price);
      })
      .catch(err => console.error('Error fetching product data:', err));
  }, [productId]);

  const increaseQuantity = () => setQuantity(quantity + 1); // Increase quantity
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1); // Decrease quantity (don't go below 1)
  };

  // Function to handle adding the product to the cart
  const addToCart = (productId, quantity) => {


    if (!user?.id) {
      notyf.error('You need to be logged in to add items to your cart!');
      return;
    }

    let token = localStorage.getItem('token');
        console.log(token);

    // Make a POST request to the backend to add the item to the cart
    fetch(`${process.env.REACT_APP_API_BASE_URL}/cart/add-to-cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
      	productId: productId,
      	price: price,
      	quantity: quantity
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.message === 'Item added to cart successfully') {
          notyf.success('Added to cart');
        } else {
          notyf.error('An error occurred');
        }
      })
      .catch(error => {
        console.error('Error adding item to cart:', error);
        notyf.error('Failed to add item to cart');
      });
  };

  return (
    <Container>
      <Row>
        <Col className="col-6 offset-3 mt-4">
          <Card>
            <Card.Body>
              <Card.Title>{name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Description</Card.Subtitle>
              <Card.Text>{description}</Card.Text>

              <Card.Subtitle className="mb-2 text-muted">Price</Card.Subtitle>
              <Card.Text>${price}</Card.Text>

              <Card.Subtitle className="mb-2 text-muted">Quantity</Card.Subtitle>
              {/* Quantity selector with + and - buttons */}
              <InputGroup className="mb-3">
                <Button variant="outline-secondary" onClick={decreaseQuantity}>
                  -
                </Button>
                <FormControl aria-label="Quantity" value={quantity} readOnly />
                <Button variant="outline-secondary" onClick={increaseQuantity}>
                  +
                </Button>
              </InputGroup>

              {/* Display the total price based on quantity */}
              <Card.Text>Total: ${price * quantity}</Card.Text>

              {/* Add to cart button */}
              {
                user.id !== null ? (  // Check if the user is logged in
                  user.isAdmin ? (  // Check if the logged-in user is an admin
                    <Button variant="danger" disabled>
                      Admin can't add
                    </Button>
                  ) : (  // If the user is logged in but not an admin
                    <Button variant="primary" onClick={() => addToCart(productId, quantity)}>
                      Add To Cart
                    </Button>
                  )
                ) : (  // If the user is not logged in
                  <Button as={Link} variant="primary" to="/login">
                    Login to Add
                  </Button>
                )
              }


            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
