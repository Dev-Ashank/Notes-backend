// models/User.js

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { logger } = require('express-winston');


const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// Hash the user's password before saving to the database
userSchema.pre('save', async function (next) {
    try {

        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        logger.error("Error while encrypting password");
        next(error);
    }
});

// Compare the entered password with the hashed password
userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
