//////////////////////////
// Importing Dependencies
//////////////////////////
const mongoose = require('./connection') // importing already connected object

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

//////////////////////
//Export the connection
/////////////////////////
module.exports = Todo