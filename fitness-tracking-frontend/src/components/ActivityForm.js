import React, { useState } from 'react';
import axios from 'axios';

function ActivityForm() {
  const [activity, setActivity] = useState('');
  const [duration, setDuration] = useState('');
  const userId = '12345'; // Hardcoded userId for example purposes

  const handleSubmit = async (e) => {
    e.preventDefault();
    const durationNumber = Number(duration);

    if (isNaN(durationNumber) || durationNumber <= 0) {
      console.error('Invalid duration:', duration);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5001/activities', { activity, duration: durationNumber, userId });
      console.log(response.data);
      setActivity('');
      setDuration('');
    } catch (error) {
      console.error('There was an error logging the activity:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div>
      <h2>Log a New Activity</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
          placeholder="Activity"
          required
        />
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          placeholder="Duration (minutes)"
          required
        />
        <button type="submit">Add Activity</button>
      </form>
    </div>
  );
}

export default ActivityForm;
