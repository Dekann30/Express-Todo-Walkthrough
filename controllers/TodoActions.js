//////////////////////////
// Importing Dependencies
//////////////////////////
const Todo = require('../models/Todo')

////////////////////////////////
// Actions(Controller Functions)
////////////////////////////////
const actions = {}

actions.index = async (req,res)=>{
    //get todos
    const todos = await Todo.find({}).catch((err)=> res.send(err))
    //render index.ejs
    res.render('index.ejs', {todos})
}

actions.seed = async (req,res)=>{
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
}

actions.create = async (req,res)=>{
    //create todo
    await Todo.create(req.body).catch((err)=> res.send(err))
    res.redirect('/todo')
}

actions.update = async (req,res)=>{
    //getid from params
    const id = req.params.id
    //get todo to update
    const todo = await Todo.findById(id)
    //update completed property
    todo.completed = true
    await todo.save() //saves changes
    res.redirect('/todo')
}
//////////////////////
//Export actions oject
//////////////////////
module.exports = actions