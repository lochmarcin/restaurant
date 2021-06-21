const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const routes = require('./routes/index');

const app = express();

app.use('/', routes)

module.exports = app