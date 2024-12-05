import { useState } from "react";
import { Container, Row, Col, Form, ListGroup } from "react-bootstrap";

import ProductsCard from './ProductsCard';

const ProductSearch = ({ products }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter courses based on the search term
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container className="my-5">
      <Row>
        <Col md={6} className="mx-auto">
          <h2 className="text-center">Search Products</h2>
          <Form.Group controlId="search" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Search by product name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Form.Group>
          <ListGroup>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductsCard productProp = {product} key = {product._id}/>
              ))
            ) : (
              <ListGroup.Item>No courses found</ListGroup.Item>
            )}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductSearch;
