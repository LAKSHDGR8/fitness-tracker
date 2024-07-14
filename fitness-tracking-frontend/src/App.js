import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ActivityForm from './components/ActivityForm';
import ActivityList from './components/ActivityList';
import LoggedInActivities from './components/LoggedInActivities';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/logged-in-activities">Logged-in Activities</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<ActivityForm />} />
          <Route path="/logged-in-activities" element={<LoggedInActivities />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
