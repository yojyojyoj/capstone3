// Bootstrap modules:
// import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';

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
		<Navbar expand="lg" className="bg-body-tertiary" sticky="top">
		      <Container>
		        <Navbar.Brand as={NavLink} to="/">GY</Navbar.Brand>
		        <Navbar.Toggle aria-controls="basic-navbar-nav" />
		        <Navbar.Collapse id="basic-navbar-nav">
		          <Nav className="ms-auto">
		            <Nav.Link as={NavLink} to="/" exact="true">Home</Nav.Link>
		            <Nav.Link as={NavLink} to="/products" exact="true">Products</Nav.Link>
		            <Nav.Link as={NavLink} to="/cart" exact="true">Cart</Nav.Link>
		            {(user.id !== null)?
		            		(user.isAdmin) ? 
		            		<>
		            			<Nav.Link as = {NavLink} to = '/addProduct'>Add Course</Nav.Link>
		            			<Nav.Link as = {NavLink} to = "/logout">Logout</Nav.Link>
		            		</>

		            		:

		            		<>
		            			<Nav.Link as={NavLink} to="/profile" exact="true">Profile</Nav.Link>
		            			<Nav.Link as={NavLink} to="/logout" exact="true">Logout</Nav.Link>
		            		</>
		            :
		            <>
		            	<Nav.Link as={NavLink} to="/login" exact="true">Login</Nav.Link>
		            	<Nav.Link as={NavLink} to="/register" exact="true">Register</Nav.Link>
		            </>
		        	}	            
		          </Nav>
		        </Navbar.Collapse>
		      </Container>
		    </Navbar>
	) 

}