const expect = require('expect')
const {generateMessage,generateLocationMessage} = require('./message.js')

describe('generateMessage',()=>{
    it('should generate correct message object',()=>{
        let from = 'kiran',
            text = 'This is a test message'
         let message = generateMessage(from,text);
         expect(message.createdAt).toBeA('number')
         expect(message).toInclude({
             from:from,
             text:text
         })
     
    })
})

describe('generateLocationMessage',()=>{
    it('should generate correct geo location message object',()=>{
        let from = 'kiran',
            lat = 15,
            lon= 19,
            url = 'https://www.google.com/maps/?q=15,19'
         let message = generateLocationMessage(from,lat,lon);
         expect(message.createdAt).toBeA('number')
         expect(message).toInclude({
             from:from,
             url:url
         })
     
    })
})