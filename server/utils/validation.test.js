const expect = require('expect')
// import isrealString
const {isRealString} = require('./validation.js')

describe('isRealString',()=>{
    it('Should reject non-string inputs',()=>{
        let res = isRealString(1234)
        expect(res).toBe(false)
    })
    it('Should reject the string with only spaces',()=>{
        let res = isRealString('  ')
        expect(res).toBe(false)
    })
    it('Should allow non-space characters',()=>{
        let res = isRealString('  kiran  ')
        expect(res).toBe(true)
    })
})
//isRealString
    // should reject non-string inputs
    // Should reject the string with only spaces
    // Should allow non-space characters