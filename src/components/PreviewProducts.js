import {Col, Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';

export default function PreviewProducts(props){

	const {data} =props;

	const {_id, name, description, price} = data;

	return(
		<Col className="my-3" xs={12} sm={4} md={4} lg={2} >
		    <Card className="cardHighlight">
		        <Card.Body  style={{ backgroundColor: 'rgb(96, 108, 98)' }}>
		            <Card.Title className="text-center">
		                <Link className="text-white" style={{ textDecoration: 'none' }} to = {`/products/${_id}`}>{name}</Link>
		            </Card.Title>
		            <Card.Text className="text-center text-white">{description}</Card.Text>
		                    
		        </Card.Body>
		        <Card.Footer style={{ backgroundColor: 'rgb(253, 251, 238)' }}>
		            <h5 className="text-center">₱{price.toFixed(2)}</h5>
		            <Link className="btn d-block text-white" style={{ backgroundColor: 'rgb(120, 160, 168)' }} to = {`/products/${_id}`}>Details</Link>
		        </Card.Footer>
		    </Card>
		</Col>
		)
}