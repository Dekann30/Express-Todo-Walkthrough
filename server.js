//////////////////////////
// Importing Dependencies
//////////////////////////
require('dotenv').config() //get .env variables but first for extra care 
const express = require('express') //web framework
const mongoose = require('mongoose') //  Object Document Manager (Work with DB)
const methodOverride = require('method-override') //override request methods
const morgan = require('morgan') // used for logging requests

//////////////////////////////
// Setup Database Connection - Put in controllers folder
//////////////////////////////
const DATABASE_URL = process.env.DATABASE_URL //loading db url
mongoose.connect(DATABASE_URL) //establish connection
const cxn = mongoose.connection //save connection in variable

//set up mongoose messages
cxn
.on('open', () => console.log('Mongo is Open'))
.on('closed', () => console.log('Mongo is closed'))
.on('error', (err) => console.log(err))

/////////////////////////////////////
//Schemas and Models
////////////////////////////////////

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

//////////////////////////
// Routes
//////////////////////////
app.get('/', (req,res)=>{
    res.send("<h1>Hello World</h1>")
})

//////////////////
//Server Listener
/////////////////
const PORT = process.env.PORT
app.listen(PORT, ()=>console.log(`Listening on port ${PORT}`))