const expect = require('expect')
const {generateMessage} = require('./message.js')

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