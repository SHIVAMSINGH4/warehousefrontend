import { useEffect, useReducer, useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom"
import "./SideNav.css"
import iconDash from "../../public/logo/dashboard.svg"
import { AiOutlineShop} from "react-icons/ai";
import { AiOutlineShoppingCart} from "react-icons/ai";
import { AiOutlineSnippets} from "react-icons/ai";
import {AiOutlineAreaChart} from "react-icons/ai"
export default function SideNav({ children }) {
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

    //active tab

    const [activ, setActiv] = useState({ type: "dashboard" })
    const [state,dispatch] = useReducer(reducer,activ)

    function reducer(state,active){
        const atab = document.getElementsByClassName("active")
        const dlink = document.getElementsByClassName("dlink")[0]
        // console.log(atab)
        console.log(dlink)
        if(atab.length>0)
            atab[0].classList.remove("active")
        switch(active.type){
            case "dashboard": dlink.classList.add("active")
        }
    }
    // function active(event) {
    //     var arr = document.querySelector(".active")
    //     console.log(arr)
    //     if(arr)
    //         arr.classList.remove("active")
    //     //    for(let i=0;i<arr.length;i++){
    //     //         arr[i].classList.remove("active")
    //     //    }
    //     // console.log(event.target)
    //     event.target.classList.add("active")
    //     console.log(event.target.innerHTML)        
    // }

    useEffect(() => {
        var arr = document.getElementsByClassName("active")
        console.log(arr)            
    }, [])

    return (
        <>
            <Button variant="primary" className="mbtn" onClick={openNav}>
                MENU

            </Button>
            <div id="mySidenav" className="sidenav" style={{ textAlign: "start"}}>
                <a className="closebtn" onClick={closeNav}>&times;</a>
                <ul style={{ padding: "0", listStyle: "none" }}>
                    <li style={{}}>
                        <button className=" dlink" onClick={(event) => {dispatch({type:"dashboard"})}} style={{ width: "100%", backgroundColor: "#f1f1f1", border: "0" }}>
                            <Link className="tablink" to="/dashboard"><AiOutlineAreaChart/>Dashboard</Link>
                        </button>
                    </li>
                    <li style={{}} >
                        <button onClick={(event) => {dispatch(event)}} style={{ width: "100%", backgroundColor: "#f1f1f1", border: "0" }}>
                            <Link className="tablink slink"  to="/stocks"><AiOutlineShop/>Stocks</Link>
                        </button>
                    </li>
                    <li style={{}}>
                        <button onClick={(event) =>{dispatch(event)}} style={{ width: "100%", backgroundColor: "#f1f1f1", border: "0" }}>
                            <Link className="tablink clink" to="/cart"><AiOutlineShoppingCart/>Cart</Link>
                        </button>
                    </li>
                    <li style={{}}>
                        <button onClick={(event) => {dispatch(event)}} style={{ width: "100%", backgroundColor: "#f1f1f1", border: "0" }}>
                            <Link className="tablink olink" to="/order"><AiOutlineSnippets/>Order</Link>
                        </button>
                    </li>
                </ul>
            </div>
            {children}
        </>
    )
}