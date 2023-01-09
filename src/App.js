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


function App() {
  return (
    <GlobalContext>
      <Router>
        <Header />
        <Routes>
          <Route path={"/"} element={<Adminlogin />} />
          <Route path={"/dashboard"} element={<Dashboard />} />
          <Route path={"/stocks"} element={<Stocks />} />
          <Route path={"/bill"} element={<Bill />} />
          <Route path={"/profile"} element={<Profile/>} />
        </Routes>
      </Router>
    </GlobalContext>
  );
}

export default App;
