// __tests__/authController.test.js

const request = require('supertest');
const { app, server } = require('../index');
const User = require('../src/models/User'); // Adjust the path accordingly

describe('Auth Controller - Signup Tests', () => {
    // Clear the database before each test
    beforeEach(async () => {
        await User.deleteMany({});
    });

    it('should create a new user and return 201 status', async () => {
        const response = await request(app)
            .post('/api/auth/signup')
            .send({ username: 'testuser', password: 'TestPassword123!' });

        // Check the response status and structure
        expect(response.status).toBe(201);
        expect(response.body).toEqual({ message: 'User signed up successfully' });

        // Check if the user is added to the database
        const user = await User.findOne({ username: 'testuser' });
        expect(user).not.toBeNull();
        expect(user.username).toBe('testuser');
    });

    it('should return 400 if username is too short', async () => {
        const response = await request(app)
            .post('/api/auth/signup')
            .send({ username: 'usr', password: 'TestPassword123!' });

        // Check the response status and structure
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: 'Invalid username length' });
    });

    it('should return 400 if password is too weak', async () => {
        const response = await request(app)
            .post('/api/auth/signup')
            .send({ username: 'validusername', password: 'weakpassword' });

        // Check the response status and structure
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: 'Password does not meet strength requirements' });
    });

    it('should return 400 if username or password is missing', async () => {
        // Test case for missing username
        let response = await request(app)
            .post('/api/auth/signup')
            .send({ password: 'TestPassword123!' });

        // Check the response status and structure
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: 'Username and password are required' });

        // Test case for missing password
        response = await request(app)
            .post('/api/auth/signup')
            .send({ username: 'testuser' });

        // Check the response status and structure
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: 'Username and password are required' });
    });

    it('should return 400 if username is already taken', async () => {
        // Create a user with the same username
        await User.create({ username: 'existinguser', password: 'password123' });

        const response = await request(app)
            .post('/api/auth/signup')
            .send({ username: 'existinguser', password: 'NewPassword123!' });

        // Check the response status and structure
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: 'Username is already taken' });
    });

    // Add more test cases for edge cases, validation, etc.
});

describe('Auth Controller - Login Tests', () => {
    // Clear the database before each test
    beforeEach(async () => {
        await User.deleteMany({});
    });

    it('should log in an existing user and return an access token', async () => {
        // Create a user for testing
        const testUser = new User({
            username: 'testuser',
            password: 'testpassword',
        });
        await testUser.save();

        // Make a login request
        const response = await request(app)
            .post('/api/auth/login')
            .send({ username: 'testuser', password: 'testpassword' });

        // Check the response status and structure
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');

        // Additional checks, if needed
    });

    it('should return 401 if username or password is incorrect', async () => {
        // Make a login request with incorrect credentials
        const response = await request(app)
            .post('/api/auth/login')
            .send({ username: 'nonexistentuser', password: 'incorrectpassword' });

        // Check the response status and structure
        expect(response.status).toBe(401);
        expect(response.body).toEqual({ error: 'Invalid username or password' });

        // Additional checks, if needed
    });

    it('should return 400 if username or password is missing', async () => {
        // Make a login request with missing credentials
        const response = await request(app)
            .post('/api/auth/login')
            .send({});

        // Check the response status and structure
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: 'Username and password are required' });

        // Additional checks, if needed
    });

    // Add more test cases as needed
});