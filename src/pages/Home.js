import Banner from '../components/Banner';
// import Highlights from '../components/Highlights';
// import CourseCard from '../components/CourseCard';
import FeaturedProducts from '../components/FeaturedProducts';

export default function Home(){
	const data = {
	       title: "Goodbye Yesterday",
	       content: "Get your essentials now!",
	       destination: "/products",
	       buttonLabel: "Shop Now!"
	   }
	
	return (
		<>
			<Banner data = {data}/>
			<FeaturedProducts />
		</>
		)
}