import { useState } from "react";
import { Container, Row, Col, Form, ListGroup, Button } from "react-bootstrap";
import ProductsCard from './ProductsCard';

const ProductSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [products, setProducts] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch courses based on search and price range
  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:4004/b4/products/search", {
        method: "POST", 
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify({
          searchTerm,
          ...(minPrice && { minPrice }),
          ...(maxPrice && { maxPrice }),
        }),

      });

      // Check if the response is successful
      if (!response.ok) {
        throw new Error("Failed to fetch product");
      }

      const data = await response.json(); // Parse JSON response
      setProducts(data);
      setErrorMessage(""); // Clear any previous errors
    } catch (error) {
        console.error("Error fetching products:", error.message);
        setErrorMessage(error.message || "Failed to fetch products. Please try again.");
        setProducts([]);
      }

  };

  // Handle the form submission for search
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (minPrice && maxPrice && Number(minPrice) > Number(maxPrice)) {
      setErrorMessage("Min Price cannot be greater than Max Price.");
      return;
    }
    fetchProducts();
  };


  return (
    <Container className="my-5">
      <Row>
        <Col md={6} className="mx-auto">
          <h2 className="text-center">Search Products</h2>

          {/* Search form */}
          <Form onSubmit={handleSearchSubmit}>
            <Form.Group controlId="search" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Search by product name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Form.Group>

            {/* Price range filter */}
            <Row>
              <Col md={6}>
                <Form.Group controlId="minPrice">
                  <Form.Label>Min Price</Form.Label>
                  <Form.Control
                    type="number"
                    value={minPrice}
                    onChange={(e) => setMinPrice(Number(e.target.value))}

                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="maxPrice">
                  <Form.Label>Max Price</Form.Label>
                  <Form.Control
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Button variant="primary" type="submit" className="mt-3">
              Search
            </Button>
          </Form>

          {/* Error message */}
          {errorMessage && <div className="mt-3 text-danger">{errorMessage}</div>}

          {/* Display courses */}
          <ListGroup className="mt-3">
            {products.length > 0 ? (
              products.map((product) => (
                <ProductsCard productsProp={product} key={product._id} />
              ))
            ) : (
              <ListGroup.Item>No products found</ListGroup.Item>
            )}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductSearch;
