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
                <Card.Title>{name}</Card.Title>
                <Card.Subtitle>Description:</Card.Subtitle>
                <Card.Text>{description}</Card.Text>
                <Card.Subtitle>Price:</Card.Subtitle>
                <Card.Text>{price}</Card.Text>

                <Link className = "btn btn-primary" to = {`/products/${_id}`} >Details</Link>
            </Card.Body>
        </Card>


    )
}