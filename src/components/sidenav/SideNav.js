import { useEffect, useReducer, useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./SideNav.css";
import iconDash from "../../public/logo/dashboard.svg";
import { AiOutlineShop } from "react-icons/ai";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { AiOutlineSnippets } from "react-icons/ai";
import { AiOutlineAreaChart } from "react-icons/ai";
import { useLocation} from 'react-router-dom';


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

    //  const [state, dispatch] = useReducer(reducer, activ);
    const [menu,setMenu] = useState([
        {title:"Dashboard",path:'dashboard',icon:<AiOutlineAreaChart />},
        {title:"Stocks",path:'stocks',icon:<AiOutlineShop />},
        {title:"Cart",path:'cart',icon: <AiOutlineShoppingCart />},
        {title:"Order",path:'order',icon: <AiOutlineSnippets />},
    ])

    //active tabs
    const [tab,setTab] = useState(0)    
    const locations = useLocation().pathname.substring(1);    

    useEffect(()=>{
        menu.forEach((e,i)=>{
            if(e.title.toLowerCase()==locations){
                setTab(i)                
            }
        })        
    })

    return (
        <>
            <Button variant="primary" className="mbtn" onClick={openNav}>
                &#9776;
            </Button>

            <div id="mySidenav" className="sidenav" style={{ textAlign: "start" }}>
                <a className="closebtn" onClick={closeNav}>&times;</a>
                <ul style={{ listStyle: "none", padding: "0" }}>
                    {
                        menu.map((ele,index)=>
                            <li  >
                            <Link key={index} to={`/${ele.path}`} onClick={()=>setTab(index)} className={`${index==tab?'active':''}`} style={{ marginLeft: "0" }}>                                
                                <div style={{display:"inline-block",width: "30%",textAlign: "center" }}>
                                    {ele.icon}
                                </div>
                                <div style={{display:"inline-block", width: "70%", textAlign: "start" }} >
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