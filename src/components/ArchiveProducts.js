import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Notyf } from 'notyf';

export default function ArchiveProducts({product, isActive, fetchData}) {

    const notyf = new Notyf();

    //state for courseId for the fetch URL
    const [productId, setProductId] = useState(product._id);

    const archiveToggle = () => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/products/${productId}/archive`, {
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
        fetch(`${process.env.REACT_APP_API_BASE_URL}/products/${productId}/activate`, {
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

                <Button style={{ backgroundColor: 'rgb(230, 138, 117)',border: 'none' }}
                 size="sm" 
                 
                 onClick={() => archiveToggle()}>Disable
                </Button>

                :

                <Button style={{ backgroundColor: 'rgb(160, 186, 139)',border: 'none' }}
                 size="sm" 
                 
                 onClick={() => activateToggle()}>Activate
                </Button>

            }
        </>

        )
}

// 