const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5001;

// More detailed CORS configuration
const corsOptions = {
  origin: 'http://localhost:3000', // Allow only this origin
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions)); // Use the CORS middleware with options
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/fitness-tracking')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
  });

const activitiesRouter = require('./routes/activities');
app.use('/activities', activitiesRouter);

app.get('/', (req, res) => {
  res.send('Hello, My Lord!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

