import { useState, useEffect, useContext } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { Navigate, Link, useNavigate } from 'react-router-dom';

import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

import UserContext from '../context/UserContext';

export default function Login() {
  const { user, fetchUserDetails } = useContext(UserContext);
  const notyf = new Notyf();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isActive, setIsActive] = useState(true);

  const authenticate = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/users/login`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (data.access) {
        localStorage.setItem('token', data.access);

        // Wait for user context to be updated before redirecting
        await fetchUserDetails();

        notyf.success('Successful Login');

        // Clear inputs
        setEmail('');
        setPassword('');

        // Redirect manually using navigate
        navigate('/');
      } else if (data.message === "Email and password do not match") {
        notyf.error(`Incorrect credentials. Try again!`);
      } else {
        notyf.error(`${email} does not exist`);
      }
    } catch (error) {
      console.error('Login error:', error);
      notyf.error('Something went wrong during login.');
    }
  };

  useEffect(() => {
    if (email !== '' && password !== '') {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [email, password]);

  return (
    user.id !== null ? (
      <Navigate to="/" />
    ) : (
      <Form className="col-6 mx-auto" onSubmit={authenticate}>
        <h1 className="my-5 text-center">Login</h1>
        <Card className="p-5">
          <Form.Group>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          {isActive ? (
            <Button variant="primary" type="submit" id="loginBtn">
              Login
            </Button>
          ) : (
            <Button variant="danger" type="submit" id="loginBtn" disabled>
              Login
            </Button>
          )}
        </Card>

        <Form.Group className="text-center mt-5">
          <Form.Label>Don't have an account yet? </Form.Label>
          <Link to="/register" className="btn btn-link">
            Click here
          </Link>
          <Form.Label> to register.</Form.Label>
        </Form.Group>
      </Form>
    )
  );
}
