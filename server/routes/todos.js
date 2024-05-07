const express = require('express')
const router = express.Router()
const dbQuery = require('../middlewares/utils/dbQuery')
const authJwt = require('../middlewares/user/authJwt')
const { getTodo } = require('../middlewares/todo')
const { getGeneric } = require('../controllers/generic')
const { TodoStatus, TodoPriority } = require('../models/todo')
const controller = require('../controllers/todo')

router.use(authJwt.verifyToken)

router.route('/').post(controller.createTodo).get(controller.todosByUser)

router.route('/statuses').get(dbQuery(TodoStatus), getGeneric)
router.route('/priorities').get(dbQuery(TodoPriority), getGeneric)

router
  .route('/:id')
  .get(getTodo, controller.todoById)
  .put(getTodo, controller.updateTodo)
  .delete(getTodo, controller.deleteTodo)

module.exports = router
