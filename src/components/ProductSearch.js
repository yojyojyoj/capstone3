import { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, ListGroup, Card, ButtonGroup } from "react-bootstrap";
import ProductsCard from "./ProductsCard";

const ProductSearch = ({ products }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [error, setError] = useState("");

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  const handleNameFilter = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredProducts(filtered);
    setError(filtered.length === 0 ? "No products found." : "");
  };

  const handlePriceSearch = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/products/search-by-price`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            minPrice: minPrice !== "" ? Number(minPrice) : undefined,
            maxPrice: maxPrice !== "" ? Number(maxPrice) : undefined,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setFilteredProducts([]);
        setError(data.message || "No products found.");
      } else {
        setFilteredProducts(data);
        setError("");
        setSearchTerm("");
      }
    } catch (err) {
      console.error("Search error:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  const handleReset = () => {
    setSearchTerm("");
    setMinPrice("");
    setMaxPrice("");
    setFilteredProducts(products);
    setError("");
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card>
            <Card.Body>
              <h3 className="text-center mb-4">Search Products</h3>
              <Form>
                <Form.Group controlId="search" className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Search by product name"
                    value={searchTerm}
                    onChange={handleNameFilter}
                  />
                </Form.Group>

                <Row className="mb-3">
                  <Col>
                    <Form.Label>Min Price</Form.Label>
                    <Form.Control
                      type="number"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                    />
                  </Col>
                  <Col>
                    <Form.Label>Max Price</Form.Label>
                    <Form.Control
                      type="number"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                    />
                  </Col>
                </Row>

                <ButtonGroup className="w-100 mb-3">
                  <Button variant="success" onClick={handlePriceSearch}>
                    Search by Price
                  </Button>
                  <Button variant="secondary" onClick={handleReset}>
                    Reset
                  </Button>
                </ButtonGroup>

                {error && (
                  <div className="text-danger text-center mb-3">{error}</div>
                )}
              </Form>
            </Card.Body>
          </Card>

          <ListGroup className="mt-4">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductsCard productProp={product} key={product._id} />
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
