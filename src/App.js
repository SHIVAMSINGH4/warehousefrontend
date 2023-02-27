// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Adminlogin from './auth/admin/Adminlogin';
import Header from './components/header/Header';
import GlobalContext from './context/ContextGlobal';
import Dashboard from './components/user/dashboard/Dashboard';
import Stocks from './components/user/stocks/Stocks';
import Cart from './components/user/billing/Cart';
import SideNav from './components/sidenav/SideNav';
import Order from './components/user/order/Order';


function App() {
  return (
    <GlobalContext>
      <Router>
        <Header />
        <Routes>
          <Route path={"/"} element={<Adminlogin />} />
          <Route path={"/dashboard"} element={<SideNav><Dashboard /></SideNav>} />
          <Route path={"/stocks"} element={<SideNav><Stocks /></SideNav>} />        
          <Route path={"/order"} element={<SideNav><Order/></SideNav>} />
          <Route path={"/cart"} element={<SideNav><Cart/></SideNav>}/>
        </Routes>
      </Router>
    </GlobalContext>
  );
}

export default App;
