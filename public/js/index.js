      
// Switching back to ES5 syntax to make it compatible to other browsers      
var socket = io()

socket.on('connect',function(){
        console.log('Connected to Server')

})

socket.on('disconnect',function(){
            console.log('Disconnectd from the server')
})

// Listen to custom events
socket.on('newMessage',function(message){
    console.log("New message from the server", message)
})
// Create a custom events
/*socket.emit('createMessage',{
    to:"admin@socket.com",
    text:"From the client"
})*/
/*socket.on('newEmail',function(email){
    console.log('Got new Email',email)
})




 socket.emit('createEmail',{
    to:"client@socket.com",
    text:"Hi, Server. How are you?",
    createdAt:new Date().getMilliseconds()
})*/


