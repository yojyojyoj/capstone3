import { Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function PreviewProducts(props) {
    const { data } = props;

    const { _id, name, description, price, image } = data; // Assuming image is available in product data

    return (
        <Col className="col-2">
            {/* Adding the class cardHighlight for min-height */}
            <Card className="cardHighlight">
                <Card.Img variant="top" src={image} alt={name} /> {/* Display product image */}
                <Card.Body>
                    <Card.Title className="text-center">
                        <Link to={`/products/${_id}`}>{name}</Link> {/* Link to product details page */}
                    </Card.Title>
                    <Card.Text>{description}</Card.Text>
                </Card.Body>
                <Card.Footer>
                    <h5 className="text-center">${price}</h5> {/* Display product price */}
                    <Link className="btn btn-primary d-block" to={`/products/${_id}`}>Details</Link> {/* Link to the product details page */}
                </Card.Footer>
            </Card>
        </Col>
    );
}
