// routes/activities.js
const express = require('express');
const router = express.Router();
const Activity = require('../models/Activity');

// Create a new activity
router.post('/', async (req, res) => {
  const newActivity = new Activity(req.body);
  try {
    const savedActivity = await newActivity.save();
    res.status(201).json(savedActivity);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all activities
router.get('/', async (req, res) => {
  try {
    const activities = await Activity.find();
    res.json(activities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

