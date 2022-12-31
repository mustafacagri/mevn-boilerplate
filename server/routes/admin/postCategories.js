const express = require('express')
const router = express.Router()
const { getPostCategory } = require('../../middlewares/post')
const controller = require('../../controllers/postcategories')
const { getGeneric } = require('../../controllers/generic')
const dbQuery = require('../../middlewares/utils/dbQuery')
const PostCategory = require('../../models/postCategory')

router.route('/')
  .get(dbQuery(PostCategory), [], getGeneric)
  .post(controller.createPostCategory)
router
  .route('/:id')
  .get(getPostCategory, controller.getPostCategory)
  .put(getPostCategory, controller.updatePostCategory)
  .delete(getPostCategory, controller.deletePostCategory)

module.exports = router
