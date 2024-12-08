import '../index.css';
import { useState, useEffect } from 'react';
import { Button, Table, Row, Col } from 'react-bootstrap';

// Import the button
import UpdateProduct from './UpdateProduct';
import ArchiveProducts from './ArchiveProducts';
import AddProduct from './AddProduct';



export default function AdminView({ productsData, fetchData }) {


    const [products, setProducts] = useState([])


    useEffect(() => {

        const productsArr = productsData.map(product => {
            return (
                <tr key={product._id} className = "text-center">
                    {/*<td>{product._id}</td>*/}
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td>{product.price}</td>
                    <td className={product.isActive ? "text-success" : "text-danger"}>
                        {product.isActive ? "Available" : "Unavailable"}
                    </td>
                    <td className="text-center">
                        <UpdateProduct product = {product} fetchData = {fetchData}/>
                    </td>
                    {<td><ArchiveProducts product={product} isActive={product.isActive} fetchData={fetchData}/></td>}
                </tr>
                )
        })

        setProducts(productsArr)

    }, [productsData])


    return(
        <>
        <Row className = "text-center">
            <Col>
             <h1 className="text-center my-4"> Admin Dashboard </h1>
            </Col>
        </Row>

        <Row className = "text-center">
            <Col>
            <AddProduct product = {products} fetchData = {fetchData}/>
            <Button className="me-3 mb-4 bg-success">Orders</Button>
            </Col>
        </Row>
            
            
            <Table striped bordered hover responsive variant = "success">
                <thead>
                    <tr className="text-center">
                        {/*<th>ID</th>*/}
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Availability</th>
                        <th colSpan="2">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {products}
                </tbody>
            </Table>    
        </>

        )
}