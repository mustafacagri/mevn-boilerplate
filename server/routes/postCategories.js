const express = require('express')
const router = express.Router()
const { getPostCategory } = require('../middlewares/post')
const controller = require('../controllers/postcategories')
const { getGeneric } = require('../controllers/generic')
const dbQuery = require('../middlewares/utils/dbQuery')
const PostCategory = require('../models/postCategory')

router.route('/').get(dbQuery(PostCategory), [], getGeneric)

router
  .route('/:id')
  .get(getPostCategory, controller.getPostCategory)

module.exports = router
