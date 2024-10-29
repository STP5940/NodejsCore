const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.redirect('/index');
});

app.get("/index", (req, res) => {
    res.render("homepage", { serverMode: req.app.get('env') });
});

module.exports = app;