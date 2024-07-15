const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const port = 5001;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://amoghpp:amogh123@amogh.9k2ydve.mongodb.net/fitness', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('Failed to connect to MongoDB', error));

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

const activitySchema = new mongoose.Schema({
    activity: { type: String, required: true },
    duration: { type: Number, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const Activity = mongoose.model('Activity', activitySchema);

// Authentication routes
app.post('/api/auth/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Middleware to authenticate the token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);
    
    jwt.verify(token, 'your_jwt_secret', (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

app.get('/', (req, res) => {
    res.send('Fitness Tracker API');
});

app.post('/activities', authenticateToken, async (req, res) => {
    try {
        const { activity, duration } = req.body;
        const newActivity = new Activity({ activity, duration, userId: req.user.userId });
        await newActivity.save();
        res.status(201).json(newActivity);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.get('/activities', authenticateToken, async (req, res) => {
    try {
        const activities = await Activity.find({ userId: req.user.userId });
        res.json(activities);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch activities' });
    }
});

app.delete('/activities', authenticateToken, async (req, res) => {
    try {
        await Activity.deleteMany({ userId: req.user.userId });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Failed to clear activities' });
    }
});

app.get('/totalDuration', authenticateToken, async (req, res) => {
    try {
        const activities = await Activity.find({ userId: req.user.userId });
        const totalDuration = activities.reduce((total, activity) => total + activity.duration, 0);
        res.json({ totalDuration });
    } catch (error) {
        res.status(500).json({ message: 'Failed to get total duration' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
