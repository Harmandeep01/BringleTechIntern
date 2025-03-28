const express = require('express')
const app = express();
const limitAuth = require('./router/auth')
const mongoDB = require('../src/db/conn')
app.use(express.json())
app.use('/limit', limitAuth )

module.exports = app;