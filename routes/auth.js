const express = require('express');
const app = express();

require('dotenv').config();

const Validator = require('../app/controllers/Validator');
const RateLimiter = require('../app/controllers/RateLimiter');
const AuthController = require('../app/controllers/AuthController');

app.post('/login', [
    RateLimiter.loginLimit(),
    Validator.usernameRequired(),
    Validator.passwordRequired()
], Validator.validationResult, AuthController.login);

app.post('/refresh', AuthController.refresh);

module.exports = app;