//////////////////////////
// Importing Dependencies
//////////////////////////
require('dotenv').config() //get .env variables but first for extra care 
const mongoose = require('mongoose') //  Object Document Manager (Work with DB)

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

//////////////////////
//Export the connection
/////////////////////////
module.exports = mongoose