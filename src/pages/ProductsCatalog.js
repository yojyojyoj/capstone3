import { useState, useEffect, useContext } from 'react';
import AdminView from '../components/AdminView';
import ProductsCard from '../components/ProductsCard';
import UserView from '../components/UserView';

import UserContext from '../context/UserContext';

export default function ProductsCatalog() {

    const {user} = useContext(UserContext);
    console.log(user)
    

    const [products, setProducts] = useState([]);


    const fetchData = () => {
        let fetchUrl = user.isAdmin === true ? `${process.env.REACT_APP_API_BASE_URL}/products/all` : `${process.env.REACT_APP_API_BASE_URL}/products/active`;
        console.log(fetchUrl)

        fetch(fetchUrl, {
            headers : {
                'Authorization' : `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            
            console.log(data);

            setProducts(data);

        });
    }

    useEffect(() => {
        fetchData();

    }, [user]);

    return(
        (user.isAdmin === true)
        ?
            <AdminView productsData={products} fetchData = {fetchData} />
        :
            <UserView productsData={products} />
    )
}