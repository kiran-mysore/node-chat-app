const path = require('path') // Nodejs built-in module
const express = require('express')
const http = require('http')
const socketIO = require('socket.io')

const {isRealString} = require('./utils/validation.js')
const {generateMessage,generateLocationMessage} = require('./utils/message.js')
const {Users} = require('./utils/users.js')

//console.log(__dirname + '/../public')

const publicPath = path.join(__dirname, '../public')
//console.log(publicPath)

const port  = process.env.PORT || 3000
const app = express()
const server = http.createServer(app)
const io = socketIO(server)
let users = new Users()

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


/*    socket.emit('newMessage',{
        from:'Admin',
        text:'Welcome to the chat app',
        createdAt:new Date().getTime()
    })*/

/*     socket.broadcast.emit('newMessage',{
        from:'Admin',
        text:'New user joined',
        createdAt:new Date().getTime()
    }) */ 


/*
    Note : Socket-io lingo
    io.emit = emits messages to everyone connected to the server
    socket.broadcast.emit = emits messages to everyone connected to the socket server except to the current user
    socket.emit = emits message to specific user

    io.to('Room name').emit = emits messages to all in the room 
    socket.broadcast.to('Room name').emit = emits messages to everyone connected to the room except to the current user.
    
*/

    socket.on('join',(params,callback)=>{
        if(!isRealString(params.name) || !isRealString(params.room)){
            // Call callback with error
            return callback('User Name and room name required!')
        }  
            // callback with data 
            socket.join(params.room)
            users.removeUser(socket.id)
            users.addUser(socket.id,params.name,params.room)

            io.to(params.room).emit('updateUserList',users.getUserList(params.room))
            socket.emit('newMessage',generateMessage('Admin','Welcome to the chat app'))
            //socket.broadcast.emit('newMessage',generateMessage('Admin','New User Joined'))
        socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin',`${params.name} has joined.`))
            callback()
      
    })

    socket.on('createMessage',(newMessage,callback)=>{

         //console.log('New message from the client',newMessage)
        
        let user = users.getUser(socket.id)
        if(user && isRealString(newMessage.text)){
            // Emit this new message to all the users connected
            io.to(user.room).emit('newMessage',generateMessage(user.name,newMessage.text))
        }

        //Just acknowledge the client
        //callback('This Server acknowledgement')
        callback()

        /* io.emit('newMessage',{
            from:newMessage.from,
            text:newMessage.text,
            createdAt:new Date().getTime()
        })*/
        //Emit this message to the users connected except the sender
/*        socket.broadcast.emit('newMessage',{
            from:newMessage.from,
            text:newMessage.text,
            createdAt:new Date().getTime()
        })*/
    })

    socket.on('createGeoLocationMessage',(coords)=>{

        let user = users.getUser(socket.id)
        if(user){
    io.to(user.room).emit('newLocationMessage',generateLocationMessage(user.name,coords.latitude,coords.longitude))
        }
       
    })

    socket.on('disconnect',()=>{
        console.log('Client got disconnected')
        let user = users.removeUser(socket.id)
        if(user){
            io.to(user.room).emit('updateUserList',users.getUserList(user.room))
            io.to(user.room).emit('newMessage',generateMessage('Admin',`${user.name} has left the room`))
        }
    })
})


server.listen(port,()=>{
    console.log(`Chat app listening at port : ${port}`)
})