require('dotenv').config();
const mongoose = require('mongoose')
module.exports = mongoose.connect(process.env.MONGO_URI, ({}))
.then(() =>console.log('MongoDB Connected Successfully!'))
.catch((err) => console.error('MongoDB Connection error', err.message))