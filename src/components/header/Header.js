import { useContext, useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import './header.css'
import Dropdown from 'react-bootstrap/Dropdown';
import { Maincontext } from '../../context/Context';
import { useNavigate } from 'react-router';
import { Row } from 'react-bootstrap';

export default function Header() {
    const { id, setid } = useContext(Maincontext)
    const [user, setUser] = useState({ type: id.name })
    const navigate = useNavigate()

    function userV(event) {        
        setUser({ type: `${event.target.innerHTML}` })
    }

    function logout() {
        import("../../constant/Constant").then(ff => { ff.clearToken() })
        navigate('/')
        setid("choose user")
    }

    useEffect(() => {
        // var admin = document.querySelector(".li");
        // console.log("id.name")
        // console.log(admin)
        // console.log(id.name)
        setUser({ type: id.name })
        // if(!user.type==id.name)
    }, [id])

    // useEffect(()=>{
    //     var admin = document.querySelector(".logout");
    //     console.log(admin)
    // },[])

    return (
        <>
            <Navbar className=' p-1 px-5 header' style={{zIndex:"1",height:"7%", backgroundColor: "#428BCA", }} fixed="top">
                <Container fluid className='ps-5'>
                    <Navbar.Brand className='name' style={{ color: "ghostwhite", fontFamily: "monospace", fontWeight: "bold", fontSize: "2rem" }}>
                        WMS
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>
                        <Dropdown>
                            {/* <Dropdown.Toggle variant="success" id="dropdown-basic" style={{backgroundColor:"ghostwhite",color:"#428BCA"}}>
                            {user.type}
                        </Dropdown.Toggle> */}
                            <Dropdown.Menu>
                                {/* <li className='hi'>hi</li> */}
                                <Dropdown.Item className='admin' onClick={userV}>admin</Dropdown.Item>
                                <Dropdown.Item className='user' onClick={userV}>user</Dropdown.Item>
                                {/* <Dropdown.Item className='logout' onClick={logout}>logout</Dropdown.Item> */}
                            </Dropdown.Menu>
                        </Dropdown>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {/* <Container fluid className='text-end bg-light mt-3 fix' style={{height:"1.5rem"}}></Container>             */}
        </>
    )
}