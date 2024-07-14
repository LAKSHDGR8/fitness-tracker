const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5001;

app.use(cors());
app.use(bodyParser.json());

const activitySchema = new mongoose.Schema({
  activity: String,
  duration: Number,
  userId: { type: String, required: true }
});

const Activity = mongoose.model('Activity', activitySchema);

app.post('/activities', async (req, res) => {
  console.log('Incoming request:', req.body);

  const { activity, duration, userId } = req.body;

  if (!activity || !duration || !userId) {
    console.log('Validation error:', { activity, duration, userId });
    return res.status(400).json({ error: 'Activity, duration, and userId are required' });
  }

  try {
    const newActivity = new Activity({ activity, duration, userId });
    await newActivity.save();
    res.status(201).json(newActivity);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/activities', async (req, res) => {
  const activities = await Activity.find();
  res.json(activities);
});

mongoose.connect('mongodb://localhost:27017/fitness', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch(error => {
    console.error('Connection error:', error);
  });
