
const express = require('express');
const authController = require('../contollers/authController');
const { validateSignupData, validateLoginData } = require('../middlewares/validateMiddleware');

const router = express.Router();

router.post('/signup', validateSignupData, authController.signup);
router.post('/login', validateLoginData, authController.login);

module.exports = router;
