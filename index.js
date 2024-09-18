const rateLimit = require('express-rate-limit');
const createError = require('http-errors');
const requestIp = require('request-ip');
const express = require('express'); //เรียก module express
const logger = require('morgan');  //เรียก module morgan

const path = require('path');

const apiUsersV1Router = require('./routes/users');
const AuthRouter = require('./routes/auth');
const IndexRouter = require('./routes/index');

const app = express(); //สร้าง object express ชื่อ app
const port = process.env.PORT || 3000; //กำหนดให้ใช้ port 3001

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// JSON body parser with a size limit of 1MB
app.use(express.json({ limit: '1mb' }));

// Body parser for URL-encoded and multipart/form-data with size limits
app.use(express.urlencoded({ limit: '1mb', extended: true }));

// Use Morgan for logging
app.use(logger('dev'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));


// Rate limiter maximum of 400 requests per 1 hour per IP address
const limiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 400,
    message: 'Too many requests from this IP, please try again later.',
    skip: (req) => {
        const pathsToSkip = [
            // '/assets/',                     // assets เก็บข้อมูลไฟล์ .css และ .js
            // '/user/language/th/show'        // แสดงภาษาปัจจุบัน
        ];

        const filesToSkip = [
            '/sw.js'                        // Service Worker
        ];

        // Check if the request path starts with any of the pathsToSkip
        if (pathsToSkip.some(path => req.path.startsWith(path))) {
            return true;
        }

        // Check if the request path ends with any of the filesToSkip
        if (filesToSkip.some(file => req.path.endsWith(file))) {
            return true;
        }

        // Check if the request path ends with '.js'
        if (req.path.endsWith('.js')) {
            return true;
        }

        return false; // Allow all other requests
    }
});

// Apply the rate limiter middleware to all requests
app.use(limiter);

// Middleware to get user IP address
app.use(requestIp.mw());

app.use('/', IndexRouter);
app.use('/auth', AuthRouter);
app.use('/api/v1/users', apiUsersV1Router);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404, 'Page Not Found'));
});

// error handler
// set locals, only providing error in development
app.use(function (err, req, res, next) {
    const statusCode = err.status || 500;
    res.locals.message = err.message;

    // Hide error details in production
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(statusCode);

    if (statusCode == 404) {
        return res.status(404).render('404');
    }

    if (req.app.get('env') == 'development') {
        return res.render('error');
    } else {
        return res.render('500');
    }
});

app.listen(port, () => {
    console.log("🦊 Server running on port : http://localhost:" + port);
});
