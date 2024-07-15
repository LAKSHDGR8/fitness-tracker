import React, { useState } from 'react';
import axios from 'axios';
import './ActivityForm.css';

const ActivityForm = () => {
    const [activity, setActivity] = useState('');
    const [duration, setDuration] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');

            // Log the activity
            await axios.post(
                'http://localhost:5001/activities',
                { activity, duration },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            // Fetch the total duration
            const response = await axios.get('http://localhost:5001/totalDuration', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const totalDuration = response.data.totalDuration;

            // Determine the message to display
            let message = 'Activity logged successfully. ';
            if (totalDuration >= 90) {
                message += 'Target met!';
            } else {
                const minutesLeft = 90 - totalDuration;
                message += `${minutesLeft} minutes left to reach the target.`;
            }

            alert(message);

            // Clear the form
            setActivity('');
            setDuration('');
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
