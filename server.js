//////////////////////////
// Importing Dependencies
//////////////////////////
require('dotenv').config() //get .env variables but first for extra care 
const express = require('express') //web framework
const methodOverride = require('method-override') //override request methods
const morgan = require('morgan') // used for logging requests
const TodoRouter = require('./controllers/TodoController')

////////////////////////////
//Create Express Application
////////////////////////////
const app = express()

//////////////////////////////
// Middleware - aap.use(middleware function)
//////////////////////////////
app.use(methodOverride('_method')) //override require methods for form submissions
app.use(morgan('tiny'))//log every request
app.use(express.urlencoded({extended:true})) //parses form bodies into req.body
app.use(express.static('public')) //serve files statically
app.use('/todo', TodoRouter)

//////////////////
//Server Listener
/////////////////
const PORT = process.env.PORT
app.listen(PORT, ()=>console.log(`Listening on port ${PORT}`))