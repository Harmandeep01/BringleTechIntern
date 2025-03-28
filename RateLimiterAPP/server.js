const http = require('http')
const app = require('./src/app')
const server = http.createServer(app)
const PORT = process.env.PORT || 5500;


server.listen(PORT, ()=>{
    console.log(`Server is running on PORT ${PORT}`)
})