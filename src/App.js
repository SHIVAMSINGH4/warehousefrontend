// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Adminlogin from './auth/Adminlogin';
import Header from './components/Header';
import GlobalContext from './context/ContextGlobal';
import Dashboard from './dashboard/Dashboard';


function App() {
  return (
    <GlobalContext>
      <Router>
        <Header />
        <Routes>
          <Route path={"/"} element={<Adminlogin />} />
          <Route path={"/dashboard"} element={<Dashboard />} />
        </Routes>
      </Router>
    </GlobalContext>
  );
}

export default App;
