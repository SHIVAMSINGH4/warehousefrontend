import { useContext, useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import './header.css'
import Dropdown from 'react-bootstrap/Dropdown';
import { MainContext } from '../../context/Context';
import { useNavigate } from 'react-router';
import { Row } from 'react-bootstrap';
import * as bs from "react-icons/bs";

export default function Header() {
    const { profile, cart } = useContext(MainContext)
    // const [user, setUser] = useState({ type: "user" })  

    const navigate = useNavigate()

    //logout function
    function logout() {
        import("../../constant/Constant").then(ff => {
            ff.clearToken()
            profile.setProfile()
            cart.setCartCount(0)
            navigate('/')
        })
    }    

    //set context state again if page get reload
    useEffect(() => {
        if (sessionStorage.getItem("userInfo") && !profile.profile) {
            profile.setProfile(JSON.parse(sessionStorage.getItem("userInfo")).body)
        }
        setCartCount(cart.cartCount)
    }, [profile, cart])
    useEffect(() => {
        if (sessionStorage.getItem("cartListItems"))
            cart.setCartCount(JSON.parse(sessionStorage.getItem("cartListItems")).length)
    }, [])

    //cart count
    const [cartCount, setCartCount] = useState(0)

    //move to cart function
    function moveToCart() {
        if (profile.profile.role == "USER")
            navigate("user/cart")
        if (profile.profile.role == "ADMIN")
            navigate("admin/cart")
    }

    return (
        <>
            <Navbar className=' p-1 px-5 header' style={{ caretColor: "transparent", zIndex: "2", height: "7%", backgroundColor: "#428BCA", }} fixed="top">
                <Container fluid className='ps-5'>
                    <Navbar.Brand className='name' style={{ color: "ghostwhite", fontFamily: "monospace", fontWeight: "bold", fontSize: "2rem" }}>
                        WMS
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    {profile.profile && <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>
                        <div className='' onClick={moveToCart} style={{ cursor: "pointer", display: "block", marginRight: "2%" }}>
                            <bs.BsCartFill size="25" />
                            <div style={{ display: "block", marginTop: "-3%", marginLeft: "2%", width: "100%", color: "white", position: "absolute", backgroundcolour: "white" }}>
                                <span >{cartCount}</span>
                            </div>
                        </div>
                        <Dropdown >
                            <Dropdown.Toggle variant="success" id="dropdown-basic" style={{ backgroundColor: "ghostwhite", color: "#428BCA" }}>
                                {profile.profile.user}
                            </Dropdown.Toggle>
                            <Dropdown.Menu >
                                {/* <Dropdown.Item className='user' onClick={profile.profile.user}>user</Dropdown.Item> */}
                                <Dropdown.Item className='logout' onClick={logout}>logout</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Navbar.Collapse>}
                </Container>
            </Navbar>
            {/* <Container fluid className='text-end bg-light mt-3 fix' style={{height:"1.5rem"}}></Container>             */}
        </>
    )
}