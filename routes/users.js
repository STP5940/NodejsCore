const express = require('express');
const app = express();

require('dotenv').config();

const ExampleController = require('../app/controllers/Users/ExampleController');

app.get('/example', ExampleController.show);

module.exports = app;