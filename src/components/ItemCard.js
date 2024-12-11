import { Card, Button } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'

export default function ItemCard({item}) {
    console.log('ItemCard received item:', item);

  const { _id, name, description, status} = item;
    const navigate = useNavigate();

    function updateCartQuantity(id) {

            fetch(`${process.env.REACT_APP_API_BASE_URL}/cart/${id}`,{

            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(res => res.json())
        .then(data => {

            console.log(data)

            if (data.error === "Error in Saving") {

                Swal.fire({

                    icon: "error",
                    title: "Unsuccessful Cart Update",
                    text: data.message

                });

            } else {

                Swal.fire({

                    icon:"success",
                    title: "Cart Updated Successfully"

                })

                window.location.reload() 
            }

        })
    }

    function removeItem(id) {

            fetch(`${process.env.REACT_APP_API_BASE_URL}/cart/${id}`,{

            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(res => res.json())
        .then(data => {

            if (data.error === "Error in Saving") {

                Swal.fire({

                    icon: "error",
                    title: "Error in Removing Item",
                    text: data.message

                })

            } else {

                Swal.fire({

                    icon:"success",
                    title: "Item Deleted"

                })

                window.location.reload() 
            }

        })
    }

  return (
    <Card className="mt-3">
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Subtitle>Description:</Card.Subtitle>
                <Card.Text>{description}</Card.Text>
                <Card.Subtitle>Status:</Card.Subtitle>
                <Card.Text>{status}</Card.Text>           
            </Card.Body>
            <Card.Footer className="d-flex justify-content-around">
                <button className="btn btn-primary btn-sm" onClick={() => updateCartQuantity(_id)}>Update</button>
                <button className="btn btn-danger btn-sm" onClick={() => removeItem(_id)}>Delete</button>
            </Card.Footer>
        </Card>
    )
}