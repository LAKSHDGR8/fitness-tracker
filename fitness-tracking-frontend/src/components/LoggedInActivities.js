import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
      setActivities([]); // Clear activities from state
    } catch (error) {
      console.error('Error clearing activities:', error);
    }
  };

  return (
    <div>
      <h2>Logged In Activities</h2>
      <ul className="activities">
        {activities.map((activity) => (
          <li key={activity._id}>
            <strong>{activity.activity}</strong>: {activity.duration} minutes
          </li>
        ))}
      </ul>
      <button onClick={handleClear}>Clear Activities</button>
    </div>
  );
}

export default LoggedInActivities;
