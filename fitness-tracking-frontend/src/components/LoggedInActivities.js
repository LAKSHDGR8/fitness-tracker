import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './LoggedInActivities.css';

function LoggedInActivities() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchActivities = async () => {
      const response = await axios.get('http://localhost:5001/activities');
      setActivities(response.data);
    };
    fetchActivities();
  }, []);

  const handleClear = async () => {
    try {
      await axios.delete('http://localhost:5001/activities');
      setActivities([]);
    } catch (error) {
      console.error('Error clearing activities:', error);
    }
  };

  return (
    <div className="activities-container">
      <h2>Logged In Activities</h2>
      <ul className="activities">
        {activities.map((activity) => (
          <li key={activity._id}>
            <span><strong>{activity.activity}</strong>: {activity.duration} minutes</span>
          </li>
        ))}
      </ul>
      <button className="action-button" onClick={handleClear}>Clear Activities</button>
    </div>
  );
}

export default LoggedInActivities;
