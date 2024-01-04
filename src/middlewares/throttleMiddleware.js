const slowDown = require('express-slow-down');

const throttleMiddleware = slowDown({
    windowMs: 1000, // Delay window in milliseconds
    delayAfter: 5, // Number of requests before delay
    delayMs: () => 500// Delay in milliseconds
});
module.exports = throttleMiddleware;