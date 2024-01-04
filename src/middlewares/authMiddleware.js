// middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Adjust the path accordingly
const logger = require('../../logger');

const authMiddleware = async (req, res, next) => {
    const bearerToken = req.header('Authorization');

    if (!bearerToken) {
        logger.error('Authorization token is missing');
        return res.status(401).json({ error: 'Authorization token is missing' });
    }
    const token = bearerToken.replace('Bearer ', '');
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);

        if (!user) {
            logger.error('Invalid token - User not found');
            return res.status(401).json({ error: 'Invalid token - User not found' });
        }

        req.user = user;
        next();
    } catch (error) {
        logger.error('Invalid token:', error.message);
        return res.status(401).json({ error: 'Invalid token' });
    }
};

module.exports = authMiddleware;

