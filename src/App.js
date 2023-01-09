// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Adminlogin from './auth/admin/Adminlogin';
import Header from './components/header/Header';
import GlobalContext from './context/ContextGlobal';
import Dashboard from './components/user/dashboard/Dashboard';
import Stocks from './components/user/stocks/Stocks';


function App() {
  return (
    <GlobalContext>
      <Router>
        <Header />
        <Routes>
          <Route path={"/"} element={<Adminlogin />} />
          <Route path={"/dashboard"} element={<Dashboard />} />
          <Route path={"/stocks"} element={<Stocks />} />
        </Routes>
      </Router>
    </GlobalContext>
  );
}

export default App;
