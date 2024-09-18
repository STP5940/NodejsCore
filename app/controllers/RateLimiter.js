const rateLimit = require('express-rate-limit');

class RateLimiter {

    // ฟังก์ชันสำหรับสร้าง login rate limiter middleware
    static loginLimit() {
        return rateLimit({
            windowMs: 60 * 1000, // 1 minute
            max: 8, // Limit 8 request per minute
            // message: 'Too many requests from this IP, please try again later.'
            handler: (req, res, next) => {
                res.status(429).json({
                    status: false,
                    message: 'Too many requests from this IP, please try again later.'
                });
            }
        });
    }
}

module.exports = RateLimiter;
