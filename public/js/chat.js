      
// Switching back to ES5 syntax to make it compatible to other browsers      
var socket = io()

socket.on('connect',function(){
    var params = jQuery.deparam(window.location.search)
        //console.log('Connected to Server')
   socket.emit('join',params,function(err){
       if(err){
        alert(err)
        window.location.href = '/';
       }else{
        console.log('No ERROR :)')
       }
   })     
})

socket.on('disconnect',function(){
            console.log('Disconnectd from the server')
})

socket.on('updateUserList', function(usersArray){
    console.log('user List', usersArray)
    let ol = jQuery('<ol></ol>')
    usersArray.forEach(function(user){
        ol.append(jQuery('<li></li>').text(user))
    })

    jQuery('#users').html(ol)
})

function scrollToBottom(){
    // Selectors
    var messages = jQuery('#messages')
    var newMessage = messages.children('li:last-child')
    // Heights
    var clientHeight = messages.prop('clientHeight')
    var scrollTop = messages.prop('scrollTop')
    var scrollHeight = messages.prop('scrollHeight')
    var newMessageHeight = newMessage.innerHeight()
    var lastMessageHeight = newMessage.prev().innerHeight()

    if(scrollTop + clientHeight + newMessageHeight + lastMessageHeight >= scrollHeight){
        //console.log('Must scroll')
        messages.scrollTop(scrollHeight)
    }
}

// Listen to custom events
socket.on('newMessage',function(message){
    var formattedTime = moment(message.createdAt).format('h:mm a')
    var template = jQuery('#message-template').html()
    var html = Mustache.render(template,{
        from:message.from,
        text:message.text,
        createdAt:formattedTime
    })
    jQuery('#messages').append(html)
    scrollToBottom()
    /*    var formattedTime = moment(message.createdAt).format('h:mm a')
        console.log("New message from the server", message)
        var li = jQuery('<li></li>')
        li.text(`${message.from}  ${formattedTime} ${message.text}`)
        jQuery('#messages').append(li)*/
})

socket.on('newLocationMessage',function(message){

    let formattedTime = moment(message.createdAt).format('h:mm a')
    console.log("New message from the server", message)
    var template = jQuery('#location-message-template').html()
    var html = Mustache.render(template,{
        from:message.from,
        url:message.url,
        createdAt:formattedTime   
    })
    jQuery('#messages').append(html)
    scrollToBottom()
    /*    var li = jQuery('<li></li>')
        // Open the link i separate tab
        var a = jQuery('<a target="_blank">My Current Location:</a>')

        li.text(`${message.from} ${formattedTime} `)
        a.attr('href',message.url)
        li.append(a)
        jQuery('#messages').append(li)*/
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
    var messageTextBox = jQuery('[name=message]')
    socket.emit('createMessage',{
        from: 'User',
        text:messageTextBox.val()
    },function(){
        // Clear the text field
        messageTextBox.val('')
    })
})

var locationButton = jQuery("#send-location")

locationButton.on('click',function(){
    if(!navigator.geolocation){
        return alert("Geolocation is not supported by your browser!")
    }

    locationButton.attr('disabled','disabled').text('Sending location ...')

        navigator.geolocation.getCurrentPosition(function(position){
            locationButton.removeAttr('disabled').text('Send location')
            
            // Emit the geolocation co-ordinates to the server
            socket.emit('createGeoLocationMessage',{
                latitude:position.coords.latitude,
                longitude:position.coords.longitude
            })
               console.log(position)
        },function(){
            locationButton.removeAttr('disabled').text('Send location')
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


