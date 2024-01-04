// jest.setup.js or jest.teardown.js

const mongoose = require('mongoose');
const app = require('./index');

// Close the MongoDB connection after all tests
afterAll(async () => {
    await mongoose.disconnect();
});

// Close the Express server after all tests
afterAll((done) => {
    app.server.close(done);
});