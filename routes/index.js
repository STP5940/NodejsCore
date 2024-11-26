const express = require('express');
const app = express();

const ConnectwalletController = require('../app/controllers/Users/ConnectwalletController');

app.get('/', (req, res) => {
    res.redirect('/index');
});

app.get("/index", (req, res) => {
    res.render("homepage", { serverMode: req.app.get('env') });
});

app.get("/connectwallet", ConnectwalletController.get);

module.exports = app;