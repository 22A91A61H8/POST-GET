const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const connectDB = require('./db');
const User = require('./models/User');

const app = express();
const PORT = 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // Serves style.css

// Serve login form
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle login POST request
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const newUser = new User({ username, password });
        await newUser.save();
        res.send(`
            <h2>Username: ${username}</h2>
            <h2>Password: ${password}</h2>
            <p>✅ Saved to MongoDB!</p>
            <a href="/">Go Back</a>
        `);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error saving data');
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
