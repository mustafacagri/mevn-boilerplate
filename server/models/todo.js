const mongoose = require('mongoose')

// Status Schema
const todoStatusSchema = new mongoose.Schema({
  order: {
    type: Number,
    unique: true,
    required: true
  },
  name: {
    type: String,
    unique: true,
    required: true
  },
  description: String
})

// Priority Schema
const todoPrioritySchema = new mongoose.Schema({
  order: {
    type: Number,
    unique: true,
    required: true
  },
  name: {
    type: String,
    unique: true,
    required: true
  },
  description: String
})

const todoSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TodoStatus'
  },
  priority: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TodoPriority'
  },
  createdTime: {
    type: Date,
    required: true,
    default: +new Date()
  },
  lastUpdatedDate: {
    type: Date,
    required: true,
    default: +new Date()
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

// Create models based on the schemas
const Todo = mongoose.model('Todo', todoSchema)
const TodoStatus = mongoose.model('TodoStatus', todoStatusSchema)
const TodoPriority = mongoose.model('TodoPriority', todoPrioritySchema)

module.exports = {
  Todo,
  TodoPriority,
  TodoStatus
}
