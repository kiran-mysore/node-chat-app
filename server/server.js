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

    // Emit a custom event
/*    socket.emit('newEmail',{
        from:"kiran@socketserver.com",
        text:"Hi this is test email from socket server",
        createdAt:new Date().getUTCDate()
    })

    // Listen to custom event
    socket.on('createEmail',(newEmail)=>{
        console.log('Got a new Email creation request',newEmail)
    })*/

/*    socket.emit('newMessage',{
        from:"server@socket.com",
        text:"From the server",
        createAt:new Date()
    })*/

    socket.on('createMessage',(newMessage)=>{
        console.log('New message from the client',newMessage)
        // Emit this new message to all the users connected
        io.emit('newMessage',{
            from:newMessage.from,
            text:newMessage.text,
            createdAt:new Date().getTime()
        })
    })

    socket.on('disconnect',()=>{
        console.log('Client got disconnected')
    })
})


server.listen(port,()=>{
    console.log(`Chat app listening at port : ${port}`)
})