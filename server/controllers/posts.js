const { response, dbc } = require('../classes')
const PostCategory = require('../models/postCategory')
const Post = require('../models/post')
const mongoose = require('mongoose')
const { controllers: { posts: STRINGS } = {} } = require('../MAGIC_STRINGS')

exports.getPost = async (req, res) => {
  try {
    res.post.hit++ // each time this route is called, we increase the hit
    await res.post.save()

    const comments =
      res?.post?.comments?.filter(comment => {
        return comment?.isActive // only returns the active comments
      }) || []

    res.post.comments = [...comments]

    response.successed(res, res.post)
  } catch (err) {
    response.failed(res, err.message)
  }
}

exports.createPostComment = async (req, res) => {
  const comments = res?.post?.comments || []
  const { name, email, comment } = req?.body
  const _id = new mongoose.mongo.ObjectId()
  const createdTime = new Date().toISOString()
  const data = { _id, name, email, comment, createdTime, isActive: false }

  comments.push({ ...data })

  res.post.comments = [...comments]
  await res.post.save()
  response.successed(res, data, STRINGS.commentCreated)
}

exports.createPost = async (req, res) => {
  try {
    const { title, description } = req.body
    let { url } = req.body

    let postCategories = req.body.postCategories.split(',')

    if (postCategories.length > 0 && !!req?.file) {
      const image = `images/posts/${req.file.filename}`

      postCategories = postCategories.map(item => mongoose.Types.ObjectId(item))

      const categories = await PostCategory.find().where('_id').in(postCategories).exec()
      postCategories = categories.map(item => item._id) // we need to use only the valid post categories

      url = await dbc.UrlGenerator(url || title, 'post')

      const post = await Post.create({ title, description, url, postCategories, image })

      response.successed(res, post, STRINGS.created)
    } else {
      response.failed(res, STRINGS.atLeastOneCategory)
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
    const { title, hit, description } = req.body
    let { postCategories, url } = req.body

    if (postCategories === '') {
      return response.failed(res, STRINGS.atLeastOneCategory)
    }

    postCategories = postCategories.split(',')
    postCategories = postCategories.map(item => mongoose.Types.ObjectId(item))

    const categories = await PostCategory.find().where('_id').in(postCategories).exec()
    postCategories = categories.map(item => item._id) // we need to use only the valid post categories

    if (url !== res.post.url) {
      // if the new and old url is not same
      url = await dbc.UrlGenerator(url || title, 'post') // use title if the url is empty
    }

    const data = { title, url, hit, postCategories, description }
    let image

    if (req?.file?.filename) {
      image = `images/posts/${req.file.filename}`
      data.image = image
    }

    Post.findByIdAndUpdate({ _id: req.params.id }, { ...data })
      .then(() => {
        response.successed(res, { ...data }, STRINGS.updated)
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

exports.updateComment = async (req, res) => {
  try {
    const { comment: newComment, postId } = req.body
    const { name, email, comment, isActive, createdTime } = newComment
    const _id = new mongoose.mongo.ObjectId(newComment._id)

    await Post.findOneAndUpdate(
      {
        _id: postId,
        'comments._id': _id
      },
      {
        $set: {
          'comments.$': {
            name,
            email,
            comment,
            isActive,
            createdTime,
            _id
          }
        }
      }
    )
      .then(() => {
        response.successed(res, { _id, name, email, comment, isActive, createdTime }, STRINGS.commentUpdated)
      })
      .catch(err => {
        response.failed(res, err.message)
      })
  } catch (err) {
    response.failed(res, err.message)
  }
}
