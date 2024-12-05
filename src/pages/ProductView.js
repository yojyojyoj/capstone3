import {Container, Row, Col, Card, Button} from 'react-bootstrap';
import {useState, useEffect, useContext} from 'react';

import { Notyf } from 'notyf';

import UserContext from '../context/UserContext';

// this hook will allow us to get params from the url.
import {useParams, useNavigate, Link} from 'react-router-dom';

export default function ProductView(){

	// create an instance of notyf to allow acces to its method and use.
	const notyf = new Notyf();

	const navigate = useNavigate();

	const { productId } = useParams();

	const { user } = useContext(UserContext);

	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState(0);

	useEffect(() => {

		// console.log(courseId);
		// fetch to get the info/data of a specific course:
		fetch(`http://localhost:4004/b4/products/${productId}`)
		.then(response => response.json())
		.then(data => {
			// console.log(data);
			setName(data.name);
			setDescription(data.description);
			setPrice(data.price);

		})

	}, [productId]);

	
	return (
		<Container>
			<Row>
				<Col className = "col-6 offset-3 mt-4">
					<Card>
					    <Card.Body>
					     <Card.Title>{name}</Card.Title>
					     <Card.Subtitle className="mb-2 text-muted">Description</Card.Subtitle>
					      <Card.Text>
					          {description}
					      </Card.Text>

					      <Card.Subtitle className="mb-2 text-muted">Price</Card.Subtitle>
					      <Card.Text>
					          {price}
					      </Card.Text>
					      {/*{
					      	(user.id !== null)
					      	?
					      	<Button variant = "primary"  onClick = {() => enroll(courseId)}>Add To Cart</Button>
					      	:
					      	<Button as = {Link} variant = "primary" to = "/addToCart">Login to Add</Button>
					      }*/}
					      
					    </Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>

		)
}