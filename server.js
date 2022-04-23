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
//Schema - definition of the data type
//Model - the object for working with the data type
const todoSchema = new mongoose.Schema({
    text: String,
    completed: Boolean
}, {timestamps: true})

const Todo = mongoose.model('Todo', todoSchema)
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
app.get('/', async (req,res)=>{
    //get todos
    const todos = await Todo.find({}).catch((err)=> res.send(err))
    //render index.ejs
    res.render('index.ejs', {todos})
})

app.get('/todo/seed', async (req,res)=>{
    //delete all exisiting todos
    await Todo.remove({}).catch((err)=> res.send(err))
    //add sample todos
    const todos = await Todo.create([
        {text: "test 1", completed: false},
        {text: "turn in store", completed: false},
        {text: "eat something", completed: true},
    ]).catch((err)=> res.send(err))
    //send the todos as JSON
    res.json(todos)
})

//////////////////
//Server Listener
/////////////////
const PORT = process.env.PORT
app.listen(PORT, ()=>console.log(`Listening on port ${PORT}`))