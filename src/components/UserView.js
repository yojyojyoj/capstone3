import { useState, useEffect } from 'react';
import ProductsCard from './ProductsCard';

import ProductSearch from './ProductSearch';
export default function UserView({productsData}) {

   

    return(
        <>
            <ProductSearch products = {productsData} />
        </>
        )
}