const { response, dbc } = require('../classes')
const PostCategory = require('../models/postCategory')
const Post = require('../models/post')
const mongoose = require('mongoose')
const { controllers: { posts: STRINGS } = {} } = require('../MAGIC_STRINGS')
const dbQuery = require('../middlewares/utils/dbQuery')

exports.getPost = async (req, res) => {
  try {
    res.post.hit++ // each time this route is called, we increase the hit
    await res.post.save()

    response.successed(res, res.post)
  } catch (err) {
    response.failed(res, err.message)
  }
}

exports.createPost = async (req, res) => {
  try {
    const { title, description } = req.body
    let { url, postCategories } = req.body

    if (postCategories) {
      postCategories = postCategories.map(item => mongoose.Types.ObjectId(item))

      const categories = await PostCategory.find().where('_id').in(postCategories).exec()
      postCategories = categories.map(item => item._id) // we need to use only the valid post categories

      if (postCategories.length > 0) {
        url = await dbc.UrlGenerator(title, 'post')
        const post = await Post.create({ title, description, url, postCategories })

        response.successed(res, post, STRINGS.created)
      } else {
        response.failed(res, STRINGS.atLeastOne)
      }
    } else {
      response.failed(res, STRINGS.atLeastOne)
    }
  } catch (err) {
    response.failed(res, err.message)
  }
}

exports.deletePost = async (req, res) => {
  try {
    await res.post.remove()
    res.json(new response.success(res.post, STRINGS.deleted))
  } catch (err) {
    response.failed(res, err.message)
  }
}

exports.updatePost = async (req, res) => {
  try {
    const { title, hit, postCategories, description } = req.body
    let { url } = req.body

    if (url !== res.post.url) {
      // if the new and old url is not same
      url = await dbc.UrlGenerator(url || title, 'post') // use title if the url is empty
    }

    const data = { title, url, hit, postCategories, description }

    Post.findByIdAndUpdate({ _id: req.params.id }, { ...data })
      .then(() => {
        response.successed(res, { title, url, hit, postCategories, description }, STRINGS.updated)
      })
      .catch(err => {
        response.failed(res, err.message)
      })
  } catch (err) {
    response.failed(res, err.message)
  }
}

// category

exports.getPostsByCategoryId = async (req, res) => {
  try {
    const posts = await Post.find({ postCategories: { $in: req.params.id } })
    response.successed(res, { category: res.postCategory, posts })

    // .get(dbQuery(Post, [{ path: 'postCategories', select: 'name' }]), getGeneric)
  } catch (err) {
    response.failed(res, err.message)
  }
}
