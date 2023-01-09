import { Row } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import SideNav from '../../sidenav/SideNav';

function BasicExample() {

  return (
    <>
      <SideNav />
      <Container id="main">
        <Row>
          <h1>dashboard component</h1>
        </Row>
      </Container>
    </>
  );
}

export default BasicExample;