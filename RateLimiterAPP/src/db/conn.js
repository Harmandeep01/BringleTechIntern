require('dotenv').config()
const mongoose = require('mongoose')

module.exports = mongoose.connect(process.env.MONGO_URI, ({}))
.then(() => console.log('mongo DB connected successfully!'))
.catch((err) => console.error(err.message));