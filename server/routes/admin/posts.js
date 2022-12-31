const express = require('express')
const router = express.Router()
const { getPost, getPostByCategory } = require('../../middlewares/post')
const controller = require('../../controllers/posts')
const { getGeneric } = require('../../controllers/generic')
const dbQuery = require('../../middlewares/utils/dbQuery')
const PostCategory = require('../../models/postCategory')
const Post = require('../../models/post')

router
  .route('/categories/:id')
  .get(getPostByCategory, controller.getPostsByCategoryId)

// {{apiURL}}admin/posts?postCategories[in]=638a63e9e128b806a49e8caa&page=2
router
  .route('/')
  .get(dbQuery(Post, [{ path: 'postCategories', select: 'name', sort: [['createdTime', 'desc' ]] }]), getGeneric)
  .post(controller.createPost)

router
  .route('/:id')
  .get(getPost, controller.getPost)
  .put(getPost, controller.updatePost)
  .delete(getPost, controller.deletePost)

module.exports = router
