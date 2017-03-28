const path = require('path') // Nodejs built-in module
const express = require('express')
const http = require('http')
const socketIO = require('socket.io')

//console.log(__dirname + '/../public')

const publicPath = path.join(__dirname, '../public')
//console.log(publicPath)

const port  = process.env.PORT || 3000
const app = express()
const server = http.createServer(app)
const io = socketIO(server)

// Configure the static folder
app.use(express.static(publicPath))

// Register a event listener
io.on('connection',(socket)=>{
    console.log("New user connected")

    socket.on('disconnect',()=>{
        console.log('Client got disconnected')
    })
})


server.listen(port,()=>{
    console.log(`Chat app listening at port : ${port}`)
})