const express = require('express');
const app = express();
const path = require('path');

require('dotenv').config();

const ExampleController = require('../app/controllers/Users/ExampleController');

app.get('/example', ExampleController.get);

module.exports = app;