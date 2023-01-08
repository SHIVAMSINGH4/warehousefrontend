import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function Header() {
    const[user,setUser] = useState({type:"select user"})
    function userV(event){
        console.log(event.target.innerHTML)
        setUser({type:`${event.target.innerHTML}`})
    }
    
    return (
        <Navbar bg="dark" expand="lg">
            <Container className="bg-danger">
                <Navbar.Brand href="#home">WMS</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end bg-secondary'>
                    <Nav className="justify-content-end bg-primary">
                        {/* <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#link">Link</Nav.Link> */}
                        <NavDropdown title={user.type} id="basic-nav-dropdown">
                            <NavDropdown.Item onClick={userV} className="vendor">user</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={userV} className='admin'>admin</NavDropdown.Item>
                            {/* <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item> */}
                            {/* <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item> */}
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}