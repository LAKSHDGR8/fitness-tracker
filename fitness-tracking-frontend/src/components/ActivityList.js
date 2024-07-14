import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ActivityList() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get('http://localhost:5001/activities');
        setActivities(response.data);
      } catch (error) {
        console.error('Error fetching activities', error);
      }
    };

    fetchActivities();
  }, []);

  return (
    <div>
      <h2>Activities</h2>
      <ul>
        {activities.map((activity) => (
          <li key={activity._id}>{activity.activity} - {activity.duration} minutes</li>
        ))}
      </ul>
    </div>
  );
}

export default ActivityList;
