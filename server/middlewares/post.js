const Post = require('../models/post')
const PostCategory = require('../models/postCategory')
const { response } = require('../classes')
const { middlewares: { posts: STRINGS } = {} } = require('../MAGIC_STRINGS')

exports.getPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).populate({ path: 'postCategories', select: 'name' })

    if (!post) {
      response.failed(res, STRINGS.canNotFindPost)
    } else {
      res.post = post
      next()
    }
  } catch (err) {
    next(new response.fail())
  }
}

exports.getPostCategory = async (req, res, next) => {
  try {
    const postCategory = await PostCategory.findById(req.params.id)

    if (!postCategory) {
      response.failed(res, STRINGS.canNotFindPostCategory)
    } else {
      res.postCategory = postCategory
      next()
    }
  } catch (err) {
    next(new response.fail())
  }
}

exports.getPostByCategory = async (req, res, next) => {
  try {
    const postCategory = await PostCategory.findById(req.params.id)

    if (!postCategory) {
      response.failed(res, STRINGS.canNotFindPostCategory)
    } else {
      res.postCategory = postCategory
      next()
    }
  } catch (err) {
    next(new response.fail())
  }
}
