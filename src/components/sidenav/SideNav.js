import { useEffect, useReducer, useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./SideNav.css";
import { AiOutlineShop } from "react-icons/ai";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { AiOutlineSnippets } from "react-icons/ai";
import { AiOutlineAreaChart } from "react-icons/ai";
import { useLocation } from 'react-router-dom';
import { useContext } from "react";
import { MainContext } from "../../context/Context";


export default function SideNav({ children }) {
    //context state
    const { profile } = useContext(MainContext)
    const navigate = useNavigate()
    // useEffect(()=>{if(!localStorage.getItem("customer-info").info)navigate("/")},[])

    //sidenav functions for small devices
    function openNav() {
        var sidenav = document.getElementsByClassName("sidenav")[0];
        // console.log(sidenav)
        sidenav.classList.add("showbar")
        document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
    }
    function closeNav() {
        var sidenav = document.getElementsByClassName("sidenav")[0];
        // console.log(sidenav)
        sidenav.classList.remove("showbar")
        document.body.style.removeProperty("background-color");
    }

    //sidenav tabs 
    const [menu, setMenu] = useState()       //state for sidenav

    //active tabs
    const [tab, setTab] = useState(0)
    const locations = useLocation().pathname;   //for getting current page's url 

    useEffect(() => {
        if (profile.profile && profile.profile.role == "ADMIN" && !menu) {
            setMenu([
                { title: "Dashboard", path: '/admin/dashboard', icon: <AiOutlineAreaChart /> },
                { title: "Stocks", path: '/admin/stocks', icon: <AiOutlineShop /> },
                // { title: "Cart", path: '/admin/cart', icon: <AiOutlineShoppingCart /> },
                { title: "Order", path: '/admin/order', icon: <AiOutlineSnippets /> },
            ])
        }
        if (profile.profile && profile.profile.role == "USER" && !menu) {
            setMenu([
                { title: "Stocks", path: '/user/stocks', icon: <AiOutlineShop /> },
                { title: "Cart", path: '/user/cart', icon: <AiOutlineShoppingCart /> },
                { title: "Order", path: '/user/order', icon: <AiOutlineSnippets /> },
            ])
        }        
        if (menu){                        //for setting tab active in sidenav after page's reload
            menu.forEach((e, i) => {                
                if (e.path.toLowerCase() == locations) {                  
                    setTab(i)
                }
            })
        }
    }, [profile, menu,locations])

    return (
        <>
            <Button variant="primary" className="mbtn" onClick={openNav}>
                &#9776;
            </Button>

            <div id="mySidenav" className="sidenav" style={{ textAlign: "start" }}>
                <a className="closebtn" onClick={closeNav}>&times;</a>
                <ul style={{ listStyle: "none", padding: "0" }}>
                    {
                        menu && menu.map((ele, index) =>
                            <li key={index}>
                                <Link to={`${ele.path}`} onClick={() => setTab(index)} className={`${index == tab ? 'active' : ''}`} style={{ marginLeft: "0" }}>
                                    <div style={{ display: "inline-block", width: "30%", textAlign: "center" }}>
                                        {ele.icon}
                                    </div>
                                    <div style={{ display: "inline-block", width: "70%", textAlign: "start" }} >
                                        {ele.title}
                                    </div>
                                </Link>
                            </li>)
                    }
                </ul>
            </div>
            {children}
        </>
    )
}