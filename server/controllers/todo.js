const { response } = require('../classes')
const { Todo, TodoStatus } = require('../models/todo')
const mongoose = require('mongoose')
const { controllers: { todos: STRINGS } = {} } = require('../MAGIC_STRINGS')

exports.createTodo = async (req, res) => {
  try {
    const { description, priority, status, title } = req.body
    const lastUpdatedDate = +new Date()
    const createdTime = lastUpdatedDate

    let data = { createdTime, description, lastUpdatedDate, priority, status, title }

    if (res?.user) {
      data = { ...data, user: res.user._id }
      const todo = await Todo.create({ ...data })

      response.successed(res, todo, STRINGS.created)
    }
  } catch (error) {
    response.failed(res, error.message)
  }
}

exports.todosByUser = async (req, res) => {
  try {
    const { user } = res
    const query = { user: user._id }
    const { lastUpdatedDate } = req?.query || {}

    if (lastUpdatedDate) {
      const date = new Date(lastUpdatedDate)
      query.lastUpdatedDate = { $gt: date }
    }

    const todos = await Todo.aggregate([
      {
        $match: { ...query } // Your match conditions here
      },
      {
        $sort: { lastUpdatedDate: -1 }
      },
      {
        $lookup: {
          from: 'todostatuses',
          localField: 'status',
          foreignField: '_id',
          as: 'status',
          pipeline: [{ $project: { _id: 1, name: 1 } }]
        }
      },
      {
        $lookup: {
          from: 'todopriorities',
          localField: 'priority',
          foreignField: '_id',
          as: 'priority',
          pipeline: [{ $project: { _id: 1, name: 1 } }]
        }
      },
      {
        $lookup: {
          from: 'users', // Assuming the users collection is named 'users'
          localField: 'user',
          foreignField: '_id',
          as: 'user',
          pipeline: [{ $project: { username: 1 } }]
        }
      },
      {
        $addFields: {
          status: { $arrayElemAt: ['$status', 0] },
          priority: { $arrayElemAt: ['$priority', 0] },
          user: { $arrayElemAt: ['$user', 0] }
        }
      }
    ])

    response.successed(res, todos)
  } catch (error) {
    response.failed(res, error.message)
  }
}

exports.todoById = async (req, res) => {
  try {
    response.successed(res, res.todo)
  } catch (error) {
    response.failed(res, error.message)
  }
}

exports.updateTodo = async (req, res) => {
  try {
    const { todo } = res
    const { description, priority, status, title } = req.body
    const lastUpdatedDate = +new Date()

    if (description && priority && status && title) {
      const data = { _id: todo._id, description, lastUpdatedDate, priority, status, title }

      const user = res.user._id
      await Todo.updateOne({ _id: todo._id, user }, { $set: { ...data } })

      response.successed(res, { ...data }, STRINGS.updated)
    } else {
      response.failed(res, STRINGS.dataMustBeProvided)
    }
  } catch (error) {
    response.failed(res, error.message)
  }
}
exports.deleteTodo = async (req, res) => {
  try {
    const { todo } = res
    const user = res.user._id

    await Todo.deleteOne({ _id: todo._id, user })

    response.successed(res, todo._id, STRINGS.deleted)
  } catch (error) {
    response.failed(res, error.message)
  }
}
