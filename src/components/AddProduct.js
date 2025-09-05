import { useState, useContext } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import { Notyf } from 'notyf';

export default function AddProduct({ fetchData }) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const notyf = new Notyf();
    const { user } = useContext(UserContext);

    // Input states
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");

    function createProduct(event) {
        event.preventDefault();

        const token = localStorage.getItem('token');

        fetch(`${process.env.REACT_APP_API_BASE_URL}/products`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                name,
                description,
                price
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data) {
                setName("");
                setDescription("");
                setPrice("");

                notyf.success("Product added successfully!");

                // Close the modal
                handleClose();

                // 🔄 Refresh the products table
                if (fetchData) {
                    fetchData();
                }

            } else {
                notyf.error("Error: Something went wrong.");
            }
        })
        .catch(() => {
            notyf.error("Error: Unable to add product.");
        });
    }

    return (
        user.isAdmin === true ? (
            <>
                <Button 
                    className="me-3 mb-4"
                    style={{ backgroundColor: 'rgb(160, 186, 139)', border: 'none' }}
                    onClick={handleShow}
                >
                    <strong>Add Product</strong>
                </Button>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add New Product</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={createProduct}>
                            <Form.Group>
                                <Form.Label>Name:</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Product Name"
                                    required
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Description:</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Description"
                                    required
                                    value={description}
                                    onChange={e => setDescription(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Price:</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Enter Price"
                                    required
                                    value={price}
                                    onChange={e => setPrice(e.target.value)}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button 
                            style={{ backgroundColor: 'rgb(76, 139, 48)', border: 'none' }} 
                            onClick={createProduct}
                        >
                            Submit
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        ) : (
            <Navigate to="/products" />
        )
    );
}
