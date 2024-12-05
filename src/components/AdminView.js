import { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';

// Import the button
import UpdateProduct from './UpdateProduct';
import ArchiveProducts from './ArchiveProducts'


export default function AdminView({ productsData, fetchData }) {


    const [products, setProducts] = useState([])


    useEffect(() => {
        // console.log(coursesData);

        const productsArr = productsData.map(product => {
            return (
                <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td>{product.price}</td>
                    <td className={product.isActive ? "text-success" : "text-danger"}>
                        {product.isActive ? "Available" : "Unavailable"}
                    </td>
                    <td className="text-center">
                        {/*<EditCourse course = {course} fetchData = {fetchData}/>*/}
                    </td>
                    {<td><ArchiveProducts product={product} isActive={product.isActive} fetchData={fetchData}/></td>}
                </tr>
                )
        })

        setProducts(productsArr)

    }, [productsData])


    return(
        <>
            <h1 className="text-center my-4"> Admin Dashboard</h1>
            
            <Table striped bordered hover responsive>
                <thead>
                    <tr className="text-center">
                        <th>ID</th>
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