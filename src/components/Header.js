import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import '../components/header.css'
import Dropdown from 'react-bootstrap/Dropdown';

export default function Header() {
    const [user, setUser] = useState({ type: "select user" })
    function userV(event) {
        console.log(event.target.innerHTML)
        setUser({ type: `${event.target.innerHTML}` })
    }

    return (
        <Navbar className=' p-1 ps-5 pe-5' expand="lg"  style={{ backgroundColor: "#428BCA"}}>
            <Container fluid className='ps-5'>
                <Navbar.Brand style={{ color: "ghostwhite", fontFamily: "monospace", fontWeight: "bold", fontSize: "2rem" }}>
                    WMS
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic" style={{backgroundColor:"ghostwhite",color:"#428BCA"}}>
                            {user.type}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={userV}>admin</Dropdown.Item>
                            <Dropdown.Item onClick={userV}>user</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}