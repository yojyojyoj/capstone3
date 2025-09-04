import { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';

import UserContext from '../context/UserContext';
// import ResetPassword from '../components/ResetPassword';
import UpdatePassword from '../components/UpdatePassword';

import {Notyf} from 'notyf';

export default function Profile(){

    const notyf = new Notyf();

    const { user } = useContext(UserContext);

    const [details,setDetails] = useState({});

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/users/details`, {
            headers: {
                Authorization: `Bearer ${ localStorage.getItem('token') }`
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            // Set the user states values with the user details upon successful login.
            if (typeof data !== undefined) {

                setDetails(data.user);

            } else if (data.error === "User not found") {

                notyf.error("User not found.")

            } else {

                notyf.error("Something went wrong, kindly contact us for assistance.")

            }
        });
    }, [])

    return (
        (user._id === null) ?
            <Navigate to="/products" /> 
            :
            <Container className="mt-5 mb-5 p-4">
            <Row className="justify-content-center">
                <Col md={8}>
                    <Card className="shadow-lg border-0">
                        <Card.Header className="text-white text-center"
                            style={{ backgroundColor: 'rgb(114, 158, 161)' }}>
                            <h2 className="mb-0">User Profile</h2>
                        </Card.Header>

                        <Card.Body style={{ backgroundColor: 'rgb(253, 251, 238)' }}>
                            <h3 className="text-center mb-4">{`${details.firstName} ${details.lastName}`}</h3>

                            <hr />

                            <h5>Contact Information</h5>
                            <ul className="list-unstyled">
                                <li><strong>Email:</strong> {details.email}</li>
                                <li><strong>Mobile No:</strong> {details.mobileNo}</li>
                            </ul>
                        </Card.Body>

                        <Card.Footer className="d-flex justify-content-between"
                        style={{ backgroundColor: 'rgb(253, 251, 238)' }}>
                            {/* Add your components here */}
                            {/* <ResetPassword /> */}
                             <UpdatePassword /> 
                            <span className="text-muted small">Last updated: Just now</span>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </Container>
    )

}