import { Card, Button } from 'react-bootstrap';
// import useState Hook from react:
// import { useState } from'react';
import {Link} from 'react-router-dom';

export default function ProductsCard({productProp}) {

    // console.log(props)

    const { name, description, price, _id} = productProp;

    
    return (
        <Card className = "my-3">
            <Card.Body>
                <Card.Title className = "text-center text-primary mb-3">{name}</Card.Title>
                <Card.Subtitle>Description:</Card.Subtitle>
                <Card.Text>{description}</Card.Text>
                <Card.Subtitle className = "mt-auto">Price:</Card.Subtitle>
                <Card.Text className = "text-danger">₱{price}</Card.Text>

                <Link className = "btn btn-primary" to = {`/products/${_id}`} >Details</Link>
            </Card.Body>
        </Card>


    )
}