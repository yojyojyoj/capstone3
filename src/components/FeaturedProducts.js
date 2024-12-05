import { CardGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import PreviewProducts from './PreviewProducts';

import {useEffect, useState} from 'react';

export default function FeaturedProducts(){
	
	const [previews, setPreviews] = useState([]);


	useEffect(() => {
		fetch("http://localhost:4004/b4/products/")
		.then(response => response.json())
		.then(data => {

			// Creating two empty array to be used to store random numbers and featired course data.
			const numbers = [];
			const featured = [];

			// Create a function that will randomize number based from the length or numbers of courses we have and make sure that there is no repititive.
			const generateRandomNums = () => {
				let randomNum = Math.floor(Math.random() * data.length);

				if(numbers.indexOf(randomNum) === -1){
					numbers.push(randomNum);
				}else {
					generateRandomNums();
				}

			}

			// for loop that will iterate 5 times to get 5 featured courses:
			for(let i = 0; i < 5; i++){
				generateRandomNums();


				featured.push(
					<PreviewProducts data = {data[numbers[i]]} key = {data[numbers[i]]._id}/>
					)
			}

			setPreviews(featured);



		})


	}, [])


	return (
		<>
			<h2 className = "text-center">Featured Products</h2>

			<CardGroup className = "justify-content-around">
				{previews}
			</CardGroup>
		</>
		)
}