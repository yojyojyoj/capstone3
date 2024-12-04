import { Card, Button } from 'react-bootstrap';
// import useState Hook from react:
// import { useState } from'react';

import {Link} from 'react-router-dom';

export default function ProductsCard({productProp}) {

    // console.log(props)

    const { name, description, price, _id} = productProp;

    // Use the state hook for this component to be able to store its state/enrollment
    //state are used to keep track of information related to individual component
    // Syntax: 
        //const [getter, setter] = useState(initialGetterValue);

        // setCount is a setter function to reassign the value of the count state


    
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