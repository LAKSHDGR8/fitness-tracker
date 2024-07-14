const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/fitness-tracker', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Failed to connect to MongoDB', err);
});

const activitySchema = new mongoose.Schema({
  activity: String,
  duration: Number,
  userId: {
    type: String,
    required: true
  }
});

const Activity = mongoose.model('Activity', activitySchema);

app.get('/activities', async (req, res) => {
  try {
    const activities = await Activity.find();
    res.json(activities);
  } catch (err) {
    res.status(500).send({ message: 'Error fetching activities', error: err });
  }
});

app.post('/activities', async (req, res) => {
  try {
    const newActivity = new Activity(req.body);
    await newActivity.save();
    res.status(201).send(newActivity);
  } catch (err) {
    res.status(400).send({ message: 'Error logging activity', error: err });
  }
});

app.delete('/activities', async (req, res) => {
  try {
    await Activity.deleteMany({});
    res.status(200).send({ message: 'All activities cleared' });
  } catch (err) {
    res.status(500).send({ message: 'Error clearing activities', error: err });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
