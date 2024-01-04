const validator = require('validator');
const validateSignupData = (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    if (!validator.isStrongPassword(password, { minLength: 6, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })) {
        return res.status(400).json({ error: 'Password does not meet strength requirements' });
    }

    if (!validator.isLength(username, { min: 4, max: 20 })) {
        return res.status(400).json({ error: 'Invalid username length' });
    }
    // Add additional validation logic if needed

    next(); // Move to the next middleware or route handler
};
const validateLoginData = (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }



    next(); // Move to the next middleware or route handler
};
const validateNoteTitle = (req, res, next) => {
    const { title } = req.body;

    // Validate if the title is not empty
    if (!title || title.trim() === '') {
        return res.status(400).json({ error: 'Title cannot be empty' });
    }

    // If the title is valid, proceed to the next middleware or the route handler
    next();
};
module.exports = {
    validateSignupData,
    validateLoginData,
    validateNoteTitle
};