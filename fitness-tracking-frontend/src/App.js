import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import ActivityForm from './components/ActivityForm';
import LoggedInActivities from './components/LoggedInActivities';
import './App.css';
import './NavBar.css';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="navbar">
          <Link to="/">Home</Link>
          <Link to="/logged-in-activities">Logged-in Activities</Link>
        </div>
        <Routes>
          <Route path="/" element={<ActivityForm />} />
          <Route path="/logged-in-activities" element={<LoggedInActivities />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
