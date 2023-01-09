import { Link } from "react-router-dom"
import "./SideNav.css"

export default function SideNav({children}){

    return (
        <>
            <div id="mySidenav" className="sidenav" style={{color:"ghostwhite"}}>
                <Link to="/dashboard">Dashboard</Link>
                {/* <Link to="/profile">Profile</Link> */}
                <Link to="/stocks">Stocks</Link>
                <Link to="/cart">Cart</Link>
            </div>
            {children}
        </>
    )
}