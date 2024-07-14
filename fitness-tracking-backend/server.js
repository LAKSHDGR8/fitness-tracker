const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5001;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/fitness-tracker', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('Failed to connect to MongoDB', error));

const activitySchema = new mongoose.Schema({
    activity: { type: String, required: true },
    duration: { type: Number, required: true },
    userId: { type: String, required: true }
});

const Activity = mongoose.model('Activity', activitySchema);

app.get('/', (req, res) => {
    res.send('Fitness Tracker API');
});

app.post('/activities', async (req, res) => {
    try {
        const { activity, duration } = req.body;
        const userId = '1234'; // Replace with your actual user ID logic
        const newActivity = new Activity({ activity, duration, userId });
        await newActivity.save();
        res.status(201).json(newActivity);
    } catch (error) {
        res.status(400).json({ message: 'Activity validation failed: userId: Path `userId` is required.' });
    }
});

app.get('/activities', async (req, res) => {
    try {
        const activities = await Activity.find();
        res.json(activities);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch activities' });
    }
});

app.delete('/activities', async (req, res) => {
    try {
        await Activity.deleteMany();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Failed to clear activities' });
    }
});

app.get('/totalDuration', async (req, res) => {
    try {
        const activities = await Activity.find();
        const totalDuration = activities.reduce((total, activity) => total + activity.duration, 0);
        res.json({ totalDuration });
    } catch (error) {
        res.status(500).json({ message: 'Failed to get total duration' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
