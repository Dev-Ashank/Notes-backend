// index.js

const express = require('express');
const mongoose = require('mongoose');
const expressWinston = require('express-winston');
const logger = require('./logger');
const winston = require('winston');
require('dotenv').config();
const authRoutes = require('./src/routes/authRoutes')
const noteRoutes = require('./src/routes/noteRoutes');
const limiter = require('./src/middlewares/rateLimiterMiddleware');
const throttleMiddleware = require('./src/middlewares/throttleMiddleware');
const app = express();

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

// Apply the limiter to all routes or to specific routes
app.use(limiter);
app.use(throttleMiddleware);

const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {});
    logger.info("Connected to the database successfully");
  } catch (error) {
    logger.error('Could not connect to the database:', error.message);
  }
};
// Call the connectToDatabase function to establish the connection
connectToDatabase();



// Start the server
const server = app.listen(PORT, () => {
  logger.info(`Server is running on http://localhost:${PORT}`);
});
// Setup logging using express-winston middleware
app.use(expressWinston.logger({
  winstonInstance: logger,
  format: winston.format.simple(),
  meta: false,
  msg: 'HTTP {{req.method}} {{req.url}}',
  expressFormat: true,
  colorize: false,
  ignoreRoute: function (req, res) { return false; }
}));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Authentication routes
app.use('/api/auth', authRoutes);

app.use('/api', noteRoutes);

// Define a simple route for testing
app.get('/', (req, res) => {
  res.send('Welcome to the Notes API!');
});

module.exports = { app, server };