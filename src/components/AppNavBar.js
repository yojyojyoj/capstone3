// Bootstrap modules:
// import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import '../index.css';
import { useState, useContext } from 'react';
import {Container, Nav, Navbar, NavDropdown} from 'react-bootstrap';
import {NavLink } from 'react-router-dom';

import UserContext from '../context/UserContext';

export default function AppNavBar(){


	//Consume user context
	const {user} = useContext(UserContext);

	// const [user, setUser] = useState(localStorage.getItem('token'));
	// console.log(user);

	return (
		<Navbar id = "nav" expand="lg" className="text-light" sticky="top">
		      <Container>
		        <Navbar.Brand className="text-light" as={NavLink} to="/">GY</Navbar.Brand>
		        <Navbar.Toggle aria-controls="basic-navbar-nav" />
		        <Navbar.Collapse id="basic-navbar-nav">
		          <Nav className="ms-auto">
		            
		            <Nav.Link className="text-light" as={NavLink} to="/products" exact="true">Products</Nav.Link>
		      
		            {(user.id !== null)?
		            		(user.isAdmin) ? 
		            		<>
		            			
		            			<Nav.Link className="text-light" as = {NavLink} to = "/logout">Logout</Nav.Link>
		            		</>

		            		:

		            		<>
		            			<Nav.Link className="text-light" as={NavLink} to="/cart" exact="true">Cart</Nav.Link>
		            			<Nav.Link className="text-light" as={NavLink} to="/orders/my-orders" exact="true">My Orders</Nav.Link>
		            			<Nav.Link className="text-light" as={NavLink} to="/profile" exact="true">Profile</Nav.Link>
		            			<Nav.Link className="text-light" as={NavLink} to="/logout" exact="true">Logout</Nav.Link>
		            		</>
		            :
		            <>
		            	<Nav.Link className="text-light" as={NavLink} to="/login" exact="true">Login</Nav.Link>
		            	<Nav.Link className="text-light" as={NavLink} to="/register" exact="true">Register</Nav.Link>
		            </>
		        	}	            
		          </Nav>
		        </Navbar.Collapse>
		      </Container>
		    </Navbar>
	) 

}