import { Row, Col } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import img1 from '../../../public/img/OIP.jpg';
import img2 from '../../../public/img/OIP (1).jpg';
import img3 from '../../../public/img/OIP (2).jpg';

function BasicExample() {

  return (
    <>
      <Container id="main">
        <Row>
          <Col className='text-center'>
            <h1>
              Dashboard
            </h1>
          </Col>
        </Row>
        <Row>
          <Col >
            <img src={img1} style={{ width: "350px",marginTop:"10rem" }}></img>
          </Col>
          <Col >
            <div style={{ display: "flex", justifyContent: "end" }}>
              <img src={img3} className="" style={{ width: "400px",marginTop:"10rem"}}></img>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default BasicExample;