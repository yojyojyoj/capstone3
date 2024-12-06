import { useState, useEffect, useContext } from 'react';
import AdminView from '../components/AdminView';
import ProductsCard from '../components/ProductsCard';
import UserView from '../components/UserView';

import UserContext from '../context/UserContext';

export default function ProductsCatalog() {

    const {user} = useContext(UserContext);
    console.log(user)
    // Checks to see if the mock data was captured
    // console.log(coursesData);
    // console.log(coursesData[0]);

    const [products, setProducts] = useState([]);

    // The "map" method loops through the individual course objects in our array and returns a component for each course
    // Multiple components created through the map method must have a unique key that will help React JS identify which components/elements have been changed, added or removed
    // Everytime the map method loops through the data, it creates a "CourseCard" component and then passes the current element in our coursesData array using the courseProp
    // const courses = coursesData.map(course => {
    //     return (
    //         <CourseCard key={course.id} courseProp={course}/>
    //     );
    // })

    const fetchData = () => {
        let fetchUrl = user.isAdmin === true ? `${process.env.REACT_APP_API_BASE_URL}/products/all` : `${process.env.REACT_APP_API_BASE_URL}/products/active`;
        console.log(fetchUrl)

        //get all active courses
        fetch(fetchUrl, {
            headers : {
                'Authorization' : `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            
            console.log(data);

            // Sets the "courses" state to map the data retrieved from the fetch request into several "CourseCard" components
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