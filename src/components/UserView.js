import { useState, useEffect } from 'react';
import ProductsCard from './ProductsCard';

// import ProductSearch from './ProductSearch';
export default function UserView({productsData}) {

    const [products, setProducts] = useState([])

    useEffect(() => {
        // console.log(productsData);

        const productsArr = productsData.map(product => {
            //only render the active products
            if(product.isActive === true) {
                return (
                    <ProductsCard productProp={product} key={product._id}/>
                    )
            } else {
                return null;
            }
        })

        //set the products state to the result of our map function, to bring our returned course component outside of the scope of our useEffect where our return statement below can see.
        setProducts(productsArr)

    }, [productsData])

    /*return(
        <>
            <ProductSearch products = {productsData} />
        </>
        )*/
}