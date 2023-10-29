const { Todo } = require('../models/todo')
const { response } = require('../classes')
const { middlewares: { todos: STRINGS } = {} } = require('../MAGIC_STRINGS')
const { Types } = require('mongoose')

exports.getTodo = async (req, res, next) => {
  try {
    let _id, user, todo

    if (res?.user?._id) {
      user = res.user._id
    }

    if (req?.params?.id) {
      _id = req.params.id
    }

    if (Types.ObjectId.isValid(_id) && Types.ObjectId.isValid(user)) {
      todo = await Todo.findOne({ _id, user }, { __v: 0, user: 0 })
        .populate({
          path: 'status',
          select: 'name'
        })
        .populate({
          path: 'priority',
          select: 'name'
        })
    }

    if (!todo) {
      response.failed(res, STRINGS.canNotFindTodo)
    } else {
      res.todo = todo
      next()
    }
  } catch (err) {
    next(new response.fail())
  }
}

exports.getTodoAsAdmin = async (req, res, next) => {
  try {
    let _id, todo

    if (req?.params?.id) {
      _id = req.params.id
    }

    if (Types.ObjectId.isValid(_id)) {
      todo = await Todo.findOne({ _id }, { __v: 0 })
        .populate({
          path: 'status',
          select: 'name'
        })
        .populate({
          path: 'priority',
          select: 'name'
        })
        .populate({
          path: 'user',
          select: 'username'
        })
    }

    if (!todo) {
      response.failed(res, STRINGS.canNotFindTodo)
    } else {
      res.todo = todo
      next()
    }
  } catch (err) {
    next(new response.fail())
  }
}
