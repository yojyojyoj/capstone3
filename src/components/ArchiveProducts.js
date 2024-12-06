import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Notyf } from 'notyf';

export default function ArchiveProducts({product, isActive, fetchData}) {

    const notyf = new Notyf();

    //state for courseId for the fetch URL
    const [productId, setProductId] = useState(product._id);

    const archiveToggle = () => {
        fetch(`http://localhost:4004/b4/products/${productId}/archive`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.success === true) {
                notyf.success("Successfully Archived")
                fetchData();

            }else {
                notyf.error("Something Went Wrong")
                fetchData();
            }


        })
    }


        const activateToggle = () => {
        fetch(`http://localhost:4004/b4/products/${productId}/activate`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.success === true) {
                notyf.success("Successfully Activated")
                fetchData();
            }else {
                notyf.error("Something Went Wrong")
                fetchData();
            }


        })
    }
 

    return(
        <>
            {isActive ?

                <Button variant="danger" size="sm" onClick={() => archiveToggle()}>Disable</Button>

                :

                <Button variant="success" size="sm" onClick={() => activateToggle()}>Activate</Button>

            }
        </>

        )
}