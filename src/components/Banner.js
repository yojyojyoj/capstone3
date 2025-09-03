import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import bg from '../images/bg-image.jpg';

export default function Banner({ data }) {
  const { title, content, destination, buttonLabel } = data;

  const backgroundStyle = {
    backgroundImage: `url(${bg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '50vh',       // 👈 half viewport height
    color: 'white',
    padding: '0 0',          // remove vertical padding to avoid extra height
    display: 'flex',         
    alignItems: 'center',   
  };

  return (
    <div style={backgroundStyle}>
      <Row className="justify-content-end text-center w-100 m-0">
        <Col md={6} className="d-flex flex-column align-items-center px-4">
          <h1>{title}</h1>
          <p>{content}</p>
          <Button
            as={Link}
            to={destination}
            style={{
              backgroundColor: 'rgb(251, 122, 30)',
              border: 'none',
            }}
          >
            {buttonLabel}
          </Button>
        </Col>
      </Row>
    </div>
  );
}
