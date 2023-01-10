import { useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom"
import "./SideNav.css"

export default function SideNav({ children }) {
    function openNav() {
        var sidenav = document.getElementsByClassName("sidenav")[0];
        // console.log(sidenav)
        sidenav.classList.add("show")
        document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
    }

    function closeNav(){
        var sidenav = document.getElementsByClassName("sidenav")[0];
        // console.log(sidenav)
        sidenav.classList.remove("show")
        document.body.style.removeProperty("background-color");
    }

    return (
        <>
            <Button variant="primary" className="mbtn" onClick={openNav}>
                MENU
            </Button>
            {/* <div className="sidenav">
                <Offcanvas id="mySidenav" show={show} onHide={handleClose} className="sidenav" style={{ color: "ghostwhite" }} >

                </Offcanvas>
            </div> */}
            <div id="mySidenav" className="sidenav" style={{ color: "ghostwhite" }} >
                <a className="closebtn" onClick={closeNav}>&times;</a>
                <Link to="/dashboard">Dashboard</Link>
                {/* <Link to="/profile">Profile</Link> */}
                <Link to="/stocks">Stocks</Link>
                <Link to="/cart">Cart</Link>
            </div>
            {children}
        </>
    )
}