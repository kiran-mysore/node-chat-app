const path = require('path') // Nodejs built-in module
const express = require('express')

const app = express()
const port  = process.env.PORT || 3000
//console.log(__dirname + '/../public')

const publicPath = path.join(__dirname, '../public')
//console.log(publicPath)

// Configure the static folder
app.use(express.static(publicPath))
app.listen(port,()=>{
    console.log(`Chat app listening at port : ${port}`)
})