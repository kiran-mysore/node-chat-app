const moment = require('moment')


//Jan 1st 1970 00:00:00 am
/*let date = new Date()
console.log(date.getMonth())*/

let date = moment()
// Default value
console.log(date.format())

// Short-hand version of the month
console.log(date.format('MMM'))
console.log(date.format('MMM YYYY H A zz' ))
date.add(100,'year').subtract(9,'months') // add 100 years to current year
console.log(date.format('MMM Do YYYY HHHH' ))

//10:52
let newDate = moment()
console.log(newDate.format('h:mm a'))

console.log(new Date().getTime())
let someTimestamp = moment().valueOf()
console.log(someTimestamp)