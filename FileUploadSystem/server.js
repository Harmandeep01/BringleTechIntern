require('dotenv').config()
const http = require('http')
const app = require('./src/app')
const PORT = 3000 || process.env.PORT
const server = http.createServer(app);

server.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`)
})