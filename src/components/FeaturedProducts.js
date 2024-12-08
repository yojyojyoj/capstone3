import { CardGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PreviewProducts from './PreviewProducts';
import { useEffect, useState } from 'react';

export default function FeaturedProducts() {
    const [previews, setPreviews] = useState([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/products/active`)
            .then((response) => response.json())
            .then((data) => {
                const numbers = [];
                const featured = [];

                // Generate a random number and ensure it's unique
                const generateRandomNums = () => {
                    let randomNum = Math.floor(Math.random() * data.length);

                    // Limit the number of attempts to prevent infinite recursion
                    let tries = 0;
                    while (numbers.indexOf(randomNum) !== -1 && tries < 100) {
                        randomNum = Math.floor(Math.random() * data.length);
                        tries++;
                    }

                    if (tries < 100) {
                        numbers.push(randomNum);
                        return randomNum;
                    }
                    return null; // Avoid infinite loop if unable to find unique number after 100 tries
                };

                // Iterate 5 times to get 5 unique featured products
                for (let i = 0; i < 5; i++) {
                    const randomIndex = generateRandomNums();
                    if (randomIndex !== null) {
                        featured.push(<PreviewProducts data={data[randomIndex]} key={data[randomIndex]._id} />);
                    }
                }

                setPreviews(featured);
            });
    }, []);

    return (
        <>
            <h2 className="text-center my-5">Featured Products</h2>
            <CardGroup className="justify-content-around">
                {previews}
            </CardGroup>
        </>
    );
}
