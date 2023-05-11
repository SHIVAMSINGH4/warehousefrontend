// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GlobalContext from './context/ContextGlobal';
import Header from './components/header/Header';
import SideNav from './components/sidenav/SideNav';
import Login from './auth/login';
import Dashboard from './components/admin/dashboard/Dashboard';
import AdminStocks from './components/admin/stocks/AdminStocks';
import AdminCart from './components/admin/billing/AdminCart';
import AdminOrder from './components/admin/order/AdminOrder';
import UserStocks from './components/user/stocks/UserStocks';
import UserCart from './components/user/billing/UserCart';
import UserOrder from './components/user/order/UserOrder';




function App() {
  return (
    <GlobalContext>
      <Router>
        <Header />
        <Routes>
          <Route path={"/"} element={<Login />} />          
          <Route path={"/admin/dashboard"} element={<SideNav><Dashboard /></SideNav>}/>
          <Route path={"/admin/stocks"} element={<SideNav><AdminStocks /></SideNav>}/> 
          <Route path={"/admin/cart"} element={<SideNav><AdminCart/></SideNav>}/>       
          <Route path={"/admin/order"} element={<SideNav><AdminOrder/></SideNav>}/>
          <Route path='/user/stocks' element={<SideNav><UserStocks /></SideNav>}/>
          <Route path={"/user/cart"} element={<SideNav><UserCart/></SideNav>}/>       
          <Route path={"/user/order"} element={<SideNav><UserOrder/></SideNav>}/>
          
        </Routes>
      </Router>
    </GlobalContext>
  );
}

export default App;
