import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes, useNavigate } from 'react-router-dom';
import ActivityForm from './components/ActivityForm';
import LoggedInActivities from './components/LoggedInActivities';
import Login from './components/Login';
import Register from './components/Register';
import './App.css';
import './NavBar.css';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    
  };

  return (
    <Router>
      <div className="App">
        <div className="navbar">
          {isLoggedIn && (
            <div>
            <Link to="/">Home</Link>
            <Link to="/logged-in-activities">Logged-in Activities</Link>
            <button onClick={handleLogout}>Logout</button>
            </div>

          )
          }
          {!isLoggedIn && (
            <div>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            </div>

          )
          }
          
          
        </div>
        <Routes>
          <Route path="/" element={<ActivityForm />} />
          <Route path="/logged-in-activities" element={<LoggedInActivities />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
