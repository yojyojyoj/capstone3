import { useState, useEffect } from 'react';
import { Button, Card, Row, Col, Table } from 'react-bootstrap';
import UpdateProduct from './UpdateProduct';
import ArchiveProducts from './ArchiveProducts';
import AddProduct from './AddProduct';

export default function AdminView({ productsData, fetchData }) {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]); // State for orders
  const [showOrders, setShowOrders] = useState(false); // Flag to toggle orders visibility

  useEffect(() => {
    const productsArr = productsData.map(product => (
      <tr key={product._id} className="text-center">
        <td>{product.name}</td>
        <td>{product.description}</td>
        <td>{product.price}</td>
        <td className={product.isActive ? "text-success" : "text-danger"}>
          {product.isActive ? "Available" : "Unavailable"}
        </td>
        <td className="text-center">
          <UpdateProduct product={product} fetchData={fetchData} />
        </td>
        <td>
          <ArchiveProducts product={product} isActive={product.isActive} fetchData={fetchData} />
        </td>
      </tr>
    ));
    setProducts(productsArr);
  }, [productsData]);

  // Fetch orders from the backend
  const fetchOrders = () => {
    let token = localStorage.getItem('token');
    fetch(`${process.env.REACT_APP_API_BASE_URL}/orders/all-orders`, {
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => response.json())
    .then(data => {
      if (data.orders) {
        setOrders(data.orders); // Set orders in state
        setShowOrders(true); // Show the orders cards
      } else {
        console.error('Error fetching orders:', data.message);
      }
    })
    .catch(error => {
      console.error('Error fetching orders:', error);
    });
  };

  return (
    <>
      <Row className="text-center">
        <Col>
          <h1 className="text-center my-4">Admin Dashboard</h1>
        </Col>
      </Row>

      <Row className="text-center">
        <Col>
          <AddProduct product={products} fetchData={fetchData} />
          <Button className="me-3 mb-4 bg-success" onClick={fetchOrders}>Orders</Button>
        </Col>
      </Row>

      {showOrders && (
        <Row>
          {orders.length > 0 ? (
            orders.map(order => (
              <Col md={10} key={order._id} className="mb-4 mx-auto">
                <Card>
                  <Card.Body>
                    <Card.Title variant="dark">Orders for user: {order.userId}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Status: {order.status}</Card.Subtitle>
                    <Card.Text>Total Price: ${order.totalPrice}</Card.Text>
                    <h5>Products Ordered:</h5>
                    {order.productsOrdered.map((productOrdered, index) => {
                      // Find the product that matches the productId in productsData
                      const orderedProduct = productsData.find(product => product._id === productOrdered.productId);
                      return (
                        <div key={index}>
                          <h6>{orderedProduct ? orderedProduct.name : "Product not found"}</h6>
                          <p>Quantity: {productOrdered.quantity}</p>
                          <p>Subtotal: ${productOrdered.subtotal}</p>
                        </div>
                      );
                    })}
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Col>
              <Card>
                <Card.Body>
                  <Card.Text>No orders found.</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          )}
        </Row>
      )}

      <Row>
        <Col>
          <Table striped bordered hover responsive variant="success">
            <thead>
              <tr className="text-center">
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Availability</th>
                <th colSpan="2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products}
            </tbody>
          </Table>
        </Col>
      </Row>
    </>
  );
}
