      
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
    var li = jQuery('<li></li>')
    li.text(`${message.from} : ${message.text}`)

    jQuery('#messages').append(li)
})

socket.on('newLocationMessage',function(message){
    console.log("New message from the server", message)
    var li = jQuery('<li></li>')
    // Open the link i separate tab
    var a = jQuery('<a target="_blank">My Current Location:</a>')

    li.text(`${message.from} : `)
    a.attr('href',message.url)
    li.append(a)
    jQuery('#messages').append(li)
})


// Listen for Server acknowledgement
/* socket.emit('createMessage',{
    from:"client",
    text:"Hi, Server."
    
},function(ack){
    console.log(`From the Server : ${ack}`)
})*/

jQuery('#message-form').on('submit',function(e){
    e.preventDefault()

    socket.emit('createMessage',{
        from: 'jQuery User',
        text:jQuery('[name=message]').val()
    },function(){

    })
})

var locationButton = jQuery("#send-location")

locationButton.on('click',function(){
    if(!navigator.geolocation){
        return alert("Geolocation is not supported by your browser!")
    }

        navigator.geolocation.getCurrentPosition(function(position){
            // Emit the geolocation co-ordinates to the server
            socket.emit('createGeoLocationMessage',{
                latitude:position.coords.latitude,
                longitude:position.coords.longitude
            })
               console.log(position)
        },function(){
            alert('Unable to fetch the location')
        })
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


