import Carousel from 'react-bootstrap/Carousel';
import img1 from '../images/image1.jpg';
import img2 from '../images/image2.jpg';
import img3 from '../images/image3.jpg';

export default function CarouselHome() {

  return (
    <Carousel>

      <Carousel.Item interval={5000}>
        <img src={img1} alt="Chefs" text="First slide"
          className="d-block w-100 img-fluid"
          style={{ height: '50vh' , objectFit: 'cover', objectPosition: 'center'}}
        />
        <Carousel.Caption>
          <h3 style={{ color: 'rgb(253, 252, 221)' }}>Book A Table Now</h3>
          <p style={{ color: 'rgb(253, 252, 221)' }}>
            We have the best chefs and interior</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item interval={5000}>
        <img src={img2} alt="Pancakes" text="Second slide" 
          className="d-block w-100 img-fluid"
          style={{ height: '50vh', objectFit: 'cover'}}
        />
        <Carousel.Caption>
          <h3>We start our day with Pancakes!</h3>
          <p>We can customize it for you</p>
        </Carousel.Caption>
      </Carousel.Item>  

      <Carousel.Item interval={5000}>
        <img src={img3} alt="Burgers" text="Third slide" 
        className="d-block w-100 img-fluid"
        style={{ height: '50vh', objectFit: 'cover'}}
        />
        <Carousel.Caption>
          <h3>Introducing our mouth-watering Burgers!</h3>
          <p style={{ color: 'rgb(253, 252, 221)' }} >
            We can also customize your burgers for you
          </p>
        </Carousel.Caption>
      </Carousel.Item>

    </Carousel>
  );
}

