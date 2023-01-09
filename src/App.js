// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Adminlogin from './auth/admin/Adminlogin';
import Header from './components/header/Header';
import GlobalContext from './context/ContextGlobal';
import Dashboard from './components/user/dashboard/Dashboard';
import Stocks from './components/user/stocks/Stocks';
import Bill from './components/user/billing/Bill';
import Profile from './components/user/profile/Profile';
import Cart from './components/user/billing/Cart';
import SideNav from './components/sidenav/SideNav';


function App() {
  return (
    <GlobalContext>
      <Router>
        <Header />
        <Routes>
          <Route path={"/"} element={<Adminlogin />} />
          <Route path={"/dashboard"} element={<SideNav><Dashboard /></SideNav>} />
          <Route path={"/stocks"} element={<SideNav><Stocks /></SideNav>} />
          <Route path={"/bill"} element={<SideNav><Bill /></SideNav>} />
          <Route path={"/profile"} element={<SideNav><Profile/></SideNav>} />
          <Route path={"/cart"} element={<SideNav><Cart/></SideNav>}/>
        </Routes>
      </Router>
    </GlobalContext>
  );
}

export default App;
