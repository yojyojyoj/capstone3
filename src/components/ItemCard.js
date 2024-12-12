import { Card, Button } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import productsData from '../data/productsData'

export default function ItemCard({item, productsData}) {
    console.log('ItemCard received item:', item);
    console.log('Cart received item:', productsData);

  const { _id, name, totalPrice, quantity, subtotal, productId} = item;
    const navigate = useNavigate();

    function updateCartQuantity(productId) {

            fetch(`${process.env.REACT_APP_API_BASE_URL}/cart/update-cart-quantity`,{

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

    function removeFromCart(productId) {

            fetch(`${process.env.REACT_APP_API_BASE_URL}/cart/${productId}/remove-from-cart`,{

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
                <Card.Subtitle>Price:</Card.Subtitle>
                <Card.Text>{totalPrice}</Card.Text>
                <Card.Subtitle>Quantity:</Card.Subtitle>
                <Card.Text>{quantity}</Card.Text> 
                <Card.Subtitle>Subtotal:</Card.Subtitle>
                <Card.Text>{subtotal}</Card.Text>           
            </Card.Body>
            <Card.Footer className="d-flex justify-content-around">
                <button className="btn btn-primary btn-sm" onClick={() => updateCartQuantity(_id)}>Update</button>
                <button className="btn btn-danger btn-sm" onClick={() => removeFromCart(_id)}>Delete</button>
            </Card.Footer>
        </Card>
    )
}