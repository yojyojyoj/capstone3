import Banner from '../components/Banner';
// import Highlights from '../components/Highlights';
// import CourseCard from '../components/CourseCard';
import FeaturedProducts from '../components/FeaturedProducts';
import CarouselHome from '../components/CarouselHome'

export default function Home(){
	const data = {
	       title: "Goodbye Yesterday",
	       content: "Your food away from home",
	       destination: "/products",
	       buttonLabel: "Get Deliveries Now!"
	   }
	
	return (
		<>
		<div>
			<Banner className= "justify-content-center" data = {data}/>
			< br/>
			<CarouselHome />
		</div>
		<div>
			
			<FeaturedProducts />
		</div>
		</>
		)
}