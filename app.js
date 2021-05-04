const express = require('express');
const bodyParser = require('body-parser');
const router = require('./app/routes/url-routes');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use('/app', express.static('public'));
app.use(router);
app.get('/*', (req, res) => {
    return res.redirect('/app');
})


module.exports = app;