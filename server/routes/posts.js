const express = require('express')
const router = express.Router()
const controller = require('../controllers/posts')
const { getPost, getPostByCategory } = require('../middlewares/post')
const dbQuery = require('../middlewares/utils/dbQuery')
const PostCategory = require('../models/postCategory')
const Post = require('../models/post')
const { getGeneric } = require('../controllers/generic')

router.use(function (req, res, next) {
  res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept')
  next()
})

router.route('/categories/:id').get(getPostByCategory, controller.getPostsByCategoryId)

// {{apiURL}}admin/posts?postCategories[in]=638a63e9e128b806a49e8caa&page=2
router
  .route('/')
  .get(dbQuery(Post, [{ path: 'postCategories', select: 'name', sort: [['createdTime', 'desc']] }]), getGeneric)

router.route('/:id').get(getPost, controller.getPost)
router.route('/:id/comments').post(getPost, controller.createPostComment)

module.exports = router
