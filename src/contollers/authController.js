// controllers/authController.js

const jwt = require('jsonwebtoken');
const User = require('../models/User');
const logger = require('../../logger'); // Adjust the path accordingly

// Create a new user account
exports.signup = async (req, res) => {
    try {
        const { username, password } = req.body;
        // Check if the username already exists
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            // Username is already taken, return a 400 response
            return res.status(400).json({ error: 'Username is already taken' });
        }
        console.log(username, password);
        const newUser = new User({ username, password });
        await newUser.save();
        logger.info(`User signed up: ${newUser.username}`);
        res.status(201).json({ message: 'User signed up successfully' });
    } catch (error) {
        logger.error('Error signing up:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Log in to an existing user account and receive an access token
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: 3600 });
        logger.info(`User logged in: ${user.username}`);
        res.json({ token });
    } catch (error) {
        logger.error('Error logging in:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
