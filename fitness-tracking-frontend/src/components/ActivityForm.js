import React, { useState } from 'react';
import axios from 'axios';

function ActivityForm() {
  const [activity, setActivity] = useState('');
  const [duration, setDuration] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5001/activities', { activity, duration });
      setActivity('');
      setDuration('');
      alert('Activity added successfully');
    } catch (error) {
      console.error('Error adding activity', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Activity:
        <input type="text" value={activity} onChange={(e) => setActivity(e.target.value)} />
      </label>
      <label>
        Duration (minutes):
        <input type="text" value={duration} onChange={(e) => setDuration(e.target.value)} />
      </label>
      <button type="submit">Add Activity</button>
    </form>
  );
}

export default ActivityForm;
