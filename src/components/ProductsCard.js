import { Card } from 'react-bootstrap';
// import useState Hook from react:
// import { useState } from'react';
import {Link} from 'react-router-dom';

export default function ProductsCard({productProp}) {


    const { name, description, price, _id} = productProp;

    
    return (
        <Card className = "my-3">
            <Card.Body>
                <Card.Title className = "text-center mb-3" 
                    style={{ color: 'rgb(230, 138, 117)' }}
                >{name}
                </Card.Title>
                <Card.Subtitle>Description:</Card.Subtitle>
                <Card.Text>{description}</Card.Text>
                <Card.Subtitle className = "mt-auto">Price:</Card.Subtitle>

                <Card.Text style={{ color: 'rgb(76, 139, 48)' }}>
                    <h4>₱{price}</h4>
                </Card.Text>

                <Link className = "btn text-light" 
                      style={{ backgroundColor: 'rgb(114, 158, 161)', border: 'none' }}
                      to = {`/products/${_id}`}>
                      Details
                </Link>
            </Card.Body>
        </Card>


    )
}