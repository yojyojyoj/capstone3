import Carousel from 'react-bootstrap/Carousel';
import img1 from '../images/image1.jpg';
import img2 from '../images/image2.jpg';
import img3 from '../images/image3.jpg';

export default function CarouselHome() {
  const carouselStyle = {
    height: '50vh',
    overflow: 'hidden'
  };

  const imageStyle = {
    height: '100%',
    width: '100%',
    objectFit: 'cover',
    objectPosition: 'center',
  };

  return (
    <Carousel style={carouselStyle}>
      <Carousel.Item interval={5000} style={carouselStyle}>
        <img
          src={img1}
          alt="Chefs"
          className="d-block w-100 img-fluid"
          style={imageStyle}
        />
        <Carousel.Caption>
          <h3 style={{ color: 'rgb(253, 252, 221)' }}>Classic Chicken with Fries Combo</h3>
          <p style={{ color: 'rgb(253, 252, 221)' }}>
            We have the best combination you can choose from
          </p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item interval={5000} style={carouselStyle}>
        <img
          src={img2}
          alt="Pancakes"
          className="d-block w-100 img-fluid"
          style={imageStyle}
        />
        <Carousel.Caption>
          <h3>We start our day with Pancakes!</h3>
          <p>We can customize it for you</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item interval={5000} style={carouselStyle}>
        <img
          src={img3}
          alt="Burgers"
          className="d-block w-100 img-fluid"
          style={imageStyle}
        />
        <Carousel.Caption>
          <h3>Introducing our mouth-watering Burgers!</h3>
          <p>
            We can also customize your burgers for you
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}
