import React, { useState } from 'react';
import { Button, Form, Alert, Spinner, Container, Row, Col } from 'react-bootstrap';

const PromoteUserToAdmin = () => {
  const [userId, setUserId] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePromote = async () => {
    setLoading(true);
    setSuccess('');
    setError('');

    try {
      const token = localStorage.getItem('token'); // Adjust if you're storing the token differently

      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/users/${userId}/set-as-admin`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.details?.message || data.error || 'An error occurred.');
      }

      const updatedUser = data.updatedUser;
      setSuccess(`User ${updatedUser.email || updatedUser._id} has been promoted to admin.`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={6}>
          <h4>Promote User to Admin</h4>

          <Form>
            <Form.Group className="mb-3" controlId="userId">
              <Form.Label>User ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter user ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" onClick={handlePromote} disabled={loading || !userId}>
              {loading ? <Spinner size="sm" animation="border" /> : 'Promote to Admin'}
            </Button>
          </Form>

          {success && <Alert className="mt-3" variant="success">{success}</Alert>}
          {error && <Alert className="mt-3" variant="danger">{error}</Alert>}
        </Col>
      </Row>
    </Container>
  );
};

export default PromoteUserToAdmin;
