const rateLimit = require('express-rate-limit');

const rateLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 100,
});

module.exports = rateLimiter;