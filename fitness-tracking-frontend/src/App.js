import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ActivityForm from './components/ActivityForm';
import LoggedInActivities from './components/LoggedInActivities';
import './NavBar.css';
import './App.css';

function App() {
    return (
        <Router>
            <div>
                <nav className="navbar">
                    <Link to="/">Home</Link>
                    <Link to="/logged-in-activities">Logged-in Activities</Link>
                </nav>
                <div className="content">
                    <Routes>
                        <Route path="/" element={<ActivityForm />} />
                        <Route path="/logged-in-activities" element={<LoggedInActivities />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
