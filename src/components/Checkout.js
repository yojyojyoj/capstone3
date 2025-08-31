import React, { useState, useContext } from 'react';
import { Button, Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';
import UserContext from '../context/UserContext';

export default function Checkout() {
  const { user } = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);

  const handleCheckout = () => {
    if (!user?.id) {
      Swal.fire({
        icon: 'error',
        title: 'Please Login',
        text: 'You need to be logged in to checkout!',
      });
      return;
    }

    // Make a POST request to the backend to process the checkout
    fetch(`${process.env.REACT_APP_API_BASE_URL}/checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === 'Ordered Successfully') {
          Swal.fire({
            icon: 'success',
            title: 'Checkout Successful',
            text: 'Your order has been placed!',
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Checkout Failed',
            text: data.message || 'There was an issue with your checkout.',
          });
        }
      })
      /*.catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Something went wrong during checkout. Please try again later.',
        });
      });*/
  };

  return (
    <div className="text-center">
      <Button variant="success" onClick={handleCheckout}>
        Proceed to Checkout
      </Button>

      {/* Optional: Modal for confirmation or additional checkout steps */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Checkout Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to proceed with checkout?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleCheckout}>
            Confirm Checkout
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
