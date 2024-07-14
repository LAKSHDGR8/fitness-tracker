import React, { useState } from 'react';
import axios from 'axios';
import './ActivityForm.css';
const userId = '1234'; // Ensure this matches your backend requirements

const ActivityForm = ({ onAddActivity }) => {
    const [activity, setActivity] = useState('');
    const [duration, setDuration] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5001/activities', { activity, duration, userId });
            alert('Activity logged successfully');
            setActivity('');
            setDuration('');
            onAddActivity(response.data); // Update the list of activities
        } catch (error) {
            console.error('Error logging activity:', error);
        }
    };

    return (
        <div className="form-container">
            <div className="form-box">
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
        </div>
    );
};

export default ActivityForm;
