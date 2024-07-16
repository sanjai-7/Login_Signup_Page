const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/users');

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    phone: String,
    password: String
});

const User = mongoose.model('User', userSchema);

app.post('/signup', async (req, res) => {
    const { username, email, phone, password } = req.body;
    try {
        const user = new User({ username, email, phone, password });
        await user.save();
        res.json({ success: true });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username, password });
        if (user) {
            res.json({ success: true });
        } else {
            res.json({ success: false, message: 'Invalid credentials' });
        }
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
