// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './auth/login';
import Header from './components/Header';
import GlobalContext from './context/ContextGlobal';

function App() {
  return (
    <GlobalContext>
      <Router>
        <Header />
        <Routes>
          <Route path={"/"} element={<Login />} />
        </Routes>
      </Router>
    </GlobalContext>
  );
}

export default App;
