import { useState, useContext } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';

import UserContext from '../context/UserContext';

import { Notyf } from 'notyf';

export default function AddProduct(){

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const notyf = new Notyf();

    const navigate = useNavigate();

    const {user} = useContext(UserContext);

    //input states
    const [name,setName] = useState("");
    const [description,setDescription] = useState("");
    const [price,setPrice] = useState("");

    function createProduct(event){

        //prevent submit event's default behavior
        event.preventDefault();

        let token = localStorage.getItem('token');
        console.log(token);

        fetch(`${process.env.REACT_APP_API_BASE_URL}/products`,{

            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({

                name: name,
                description: description,
                price: price

            })
        })
        .then(res => res.json())
        .then(data => {

            //data is the response of the api/server after it's been process as JS object through our res.json() method.
            console.log(data);
            if (data) {
                
                setName("")
                setDescription("")
                setPrice(0);

                notyf.success("Product Added")
                navigate("/products");
                

            } else {

                notyf.error("Error: Something Went Wrong.")

            }

        })

    }

    return (


            (user.isAdmin === true)
            ?
            <>
                <Button className = "me-3 mb-4"
                style={{ backgroundColor: 'rgb(160, 186, 139)', border: 'none' }}
                onClick={handleShow} ><strong>Add Product</strong></Button>

                <Modal show={show} onHide={handleClose}>
                       <Modal.Header closeButton>
                         <Modal.Title>Add New Product</Modal.Title>
                       </Modal.Header>
                       <Modal.Body>
                          <Form onSubmit={e => createProduct(e)}>
                    <Form.Group>
                        <Form.Label>Name:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Product Name"
                            required
                            value={name}
                            onChange={e => {setName(e.target.value)}}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Description"
                            required
                            value={description}
                            onChange={e => {setDescription(e.target.value)}}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Price:</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter Price"
                            required
                            value={price}
                            onChange={e => {setPrice(e.target.value)}}
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
                          onClick= {event => createProduct(event)}>
                           Submit
                         </Button>
                       </Modal.Footer>
                     </Modal>


            </>
            :
            <Navigate to="/products" />

    )


}