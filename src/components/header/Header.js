import { useContext, useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import './header.css'
import Dropdown from 'react-bootstrap/Dropdown';
import { MainContext } from '../../context/Context';
import { useNavigate } from 'react-router';
import { Row } from 'react-bootstrap';

export default function Header() {
    const { profile } = useContext(MainContext)
    // const [user, setUser] = useState({ type: "user" })  

    const navigate = useNavigate()

    //logout function
    function logout() {
        import("../../constant/Constant").then(ff => {
            ff.clearToken()
            profile.setProfile()
            navigate('/')
        })
    }

    //useEffect(() => {
    // var admin = document.querySelector(".li");
    // console.log("id.name")
    // console.log(admin)
    // console.log(id.name)
    //setUser({ type: id.name })
    // if(!user.type==id.name)
    // }, [id])

    // useEffect(()=>{
    //     var admin = document.querySelector(".logout");
    //     console.log(admin)
    // },[])

    //set context state again if page get reload
    useEffect(()=>{         
        if(sessionStorage.getItem("userinfo")&&!profile.profile){            
            profile.setProfile(JSON.parse(sessionStorage.getItem("userinfo")))
        }          
    },[profile])

    return (
        <>
            <Navbar className=' p-1 px-5 header' style={{ zIndex: "2", height: "7%", backgroundColor: "#428BCA", }} fixed="top">
                <Container fluid className='ps-5'>
                    <Navbar.Brand className='name' style={{ color: "ghostwhite", fontFamily: "monospace", fontWeight: "bold", fontSize: "2rem" }}>
                        WMS
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    {profile.profile && <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>
                        <Dropdown >
                            <Dropdown.Toggle variant="success" id="dropdown-basic" style={{ backgroundColor: "ghostwhite", color: "#428BCA" }}>
                                {profile.profile.user}
                            </Dropdown.Toggle>
                            <Dropdown.Menu >
                                {/* <Dropdown.Item className='user' onClick={profile.profile.user}>user</Dropdown.Item> */}
                                <Dropdown.Item className='logout'  onClick={logout}>logout</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Navbar.Collapse>}
                </Container>
            </Navbar>
            {/* <Container fluid className='text-end bg-light mt-3 fix' style={{height:"1.5rem"}}></Container>             */}
        </>
    )
}