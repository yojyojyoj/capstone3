import { useState, useEffect, useContext } from 'react';
import AdminView from '../components/AdminView';
import ProductsCard from '../components/ProductsCard';
import UserView from '../components/UserView';

import UserContext from '../context/UserContext';


export default function ProductsCatalog(){

	const {user} = useContext(UserContext);

		const [products, setProducts] = useState([]);
		const [minPrice, setMinPrice] = useState('');
		const [maxPrice, setMaxPrice] = useState('');

	    const fetchData = () => {
        let fetchUrl = user.isAdmin === true ? "http://localhost:4004/b4/products/all" : "http://localhost:4004/b4/products/";


        fetch(fetchUrl, {
            // method : 'POST',
            headers : {
                'Authorization' : `Bearer ${localStorage.getItem('token')}`,
                'Content-Type' : 'application.json',
            }
        })
        .then(res => res.json())
        .then(data => {

            setProducts(data);

        });
    }

    useEffect(() => {
        fetchData();

    }, [user, minPrice, maxPrice]);

     return (
        // <>
        //     <div className="mt-5 p-5 text-white">
        //         {/* Search Form for Price Range */}
        //         <div>
        //             <label htmlFor="minPrice">Min Price:</label>
        //             <input 
        //                 type="number" 
        //                 id="minPrice" 
        //                 value={minPrice} 
        //                 onChange={(e) => setMinPrice(e.target.value)} 
        //                 placeholder="Enter min price" 
        //             />
        //         </div>
        //         <div>
        //             <label htmlFor="maxPrice">Max Price:</label>
        //             <input 
        //                 type="number" 
        //                 id="maxPrice" 
        //                 value={maxPrice} 
        //                 onChange={(e) => setMaxPrice(e.target.value)} 
        //                 placeholder="Enter max price" 
        //             />
        //         </div>
        //         <button onClick={fetchData}>Search</button>

        //     </div>
        // </>
        (user.isAdmin === true)
        ?
            <AdminView productsData={products} fetchData = {fetchData} />
        :
            <UserView productsData={products} />
    );
}