import { useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom"
import "./SideNav.css"

export default function SideNav({ children }) {
    function openNav() {
        var sidenav = document.getElementsByClassName("sidenav")[0];
        // console.log(sidenav)
        sidenav.classList.add("showbar")
        document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
    }

    function closeNav(){
        var sidenav = document.getElementsByClassName("sidenav")[0];
        // console.log(sidenav)
        sidenav.classList.remove("showbar")
        document.body.style.removeProperty("background-color");
    }

    return (
        <>
            <Button variant="primary" className="mbtn" onClick={openNav}>
                MENU
            </Button>
            <div id="mySidenav" className="sidenav" style={{ color: "ghostwhite" }} >
                <a className="closebtn" onClick={closeNav}>&times;</a>
                <Link to="/dashboard">Dashboard</Link>                
                <Link to="/stocks">Stocks</Link>
                <Link to="/cart">Cart</Link>
                <Link to="/order">Order</Link>
            </div>
            {children}
        </>
    )
}