import Banner from '../components/Banner';
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
		<div className="w-100 m-0 p-0">
			<Banner className= "justify-content-center" data = {data}/>			
		</div>
		<div>
			<CarouselHome />
			<FeaturedProducts />
		</div>
		</>
		)
}