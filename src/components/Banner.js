import {Row, Col, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';


export default function Banner({data}){
	
	const {title, content, destination, buttonLabel} = data;
	
	return (
		<Row className = "text-center my-5">
		    <Col>
		         <h1>{title}</h1>
		         <p>{content}</p>

		         <Button 
		         	as= { Link } 
		         	style={{ backgroundColor: 'rgb(120, 160, 168)' }} 
		         	to={destination}>{buttonLabel}
		         </Button>

		    </Col>
		</Row>
		)
}