import { Button, Form } from 'react-bootstrap';
import { useState, useEffect, useContext } from 'react';
import { useNavigate, Navigate, Link } from 'react-router-dom'; // Import useNavigate for programmatic navigation
import UserContext from '../context/UserContext';
import { Notyf } from 'notyf';

export default function Register() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate(); // Initialize the useNavigate hook
  const notyf = new Notyf();

  // State hooks to store the values of the input fields:
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // this state will determine whether the register button is enabled or not
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    // Activate button only if all fields are filled and passwords match
    if (firstName !== "" && lastName !== "" && email !== "" && mobileNo !== '' && password === confirmPassword) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [firstName, lastName, email, mobileNo, password, confirmPassword]);

  // Create a function that will be triggered when the register button is clicked:
  const registerUser = (event) => {
    // Prevent the page from refreshing during submission
    event.preventDefault();

    console.log("Register button is clicked");

    // Send a request to register a user in the API
    fetch('http://localhost:4004/b4/users/register', {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json',
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        mobileNo,
        password,
      }),
    })
    .then(response => response.json())
    .then(data => {
      if (data.message === 'Registered Successfully') {
        // Clear the form after successful registration
        setFirstName('');
        setLastName('');
        setEmail('');
        setMobileNo('');
        setPassword('');
        setConfirmPassword('');

        notyf.success("Registration successful!");
        
        // Redirect to login page
        navigate('/login'); // Use the navigate function to go to the login page
      } else if (data.message === "Email invalid") {
        notyf.error('Email is invalid');
      } else if (data.message === "Mobile number invalid") {
        notyf.error('Mobile number is invalid');
      } else if (data.message === "Password must be at least 8 characters") {
        notyf.error("Password must be at least 8 characters");
      } else {
        notyf.error("Something went wrong!");
      }
    });
  };

  return (
    (user.id !== null) 
    ? <Navigate to="/login" /> 
    : (
      <Form className="col-6 mx-auto" onSubmit={event => registerUser(event)}>
        <h1 className="my-5 text-center">Register</h1>

        <Form.Group className="mb-3">
          <Form.Label>First Name:</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter first name" 
            value={firstName}
            onChange={event => setFirstName(event.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Last Name:</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter last name" 
            value={lastName}
            onChange={event => setLastName(event.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email address:</Form.Label>
          <Form.Control 
            type="email" 
            placeholder="Enter email" 
            value={email}
            onChange={event => setEmail(event.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Mobile No:</Form.Label>
          <Form.Control 
            type="number" 
            placeholder="Enter 11 Digit no." 
            value={mobileNo}
            onChange={event => setMobileNo(event.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password:</Form.Label>
          <Form.Control 
            type="password" 
            placeholder="Password (at least 8 characters)" 
            value={password}
            onChange={event => setPassword(event.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Verify Password:</Form.Label>
          <Form.Control 
            type="password" 
            placeholder="Verify your Password" 
            value={confirmPassword}
            onChange={event => setConfirmPassword(event.target.value)}
            required
          />
        </Form.Group>

        {isActive ? 
          <Button variant="primary" type="submit">Register</Button> :
          <Button variant="danger" type="submit" disabled>
            Please enter your registration details
          </Button>
        }

        <Form.Group className="text-center mt-5">
          <Form.Label>Already have an account? </Form.Label>
          <Link to="/login" className="btn btn-link">
            Click here
          </Link>
          <Form.Label> to log in.</Form.Label>
        </Form.Group>
      </Form>
    )
  );
}
