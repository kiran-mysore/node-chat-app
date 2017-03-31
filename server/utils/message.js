const moment = require('moment')

const generateMessage = (from,text)=>{
    return{
            from:from,
            text:text,
            //createdAt: new Date().getTime()
            createdAt:moment().valueOf()
    }
}

const generateLocationMessage = (from, lat,lon)=>{
    return{
        from:from,
        url:`https://www.google.com/maps/?q=${lat},${lon}`,
        //createdAt: new Date().getTime()
        createdAt:moment().valueOf()
    }
}
module.exports = {
    generateMessage,
    generateLocationMessage
}