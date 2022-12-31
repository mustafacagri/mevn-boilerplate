const { response, dbc } = require('../classes')
const { controllers: { postCategories: STRINGS } = {} } = require('../MAGIC_STRINGS')
const mongoose = require('mongoose')
const PostCategory = require('../models/postCategory')

exports.getPostCategory = async (req, res) => {
  try {
    const category = await PostCategory.find({ _id: req.params.id })
    response.successed(res, { ...category })
  } catch (err) {
    response.failed(res, err.message)
  }
}

exports.updatePostCategory = async (req, res) => {
  try {
    const { name } = req.body
    let { url } = req.body

    if (url !== res.postCategory.url) {
      // if the new and old url is not same
      url = await dbc.UrlGenerator(url || name, 'postCategory') // use title if the url is empty
    }

    const data = { name, url }

    PostCategory.findByIdAndUpdate({ _id: req.params.id }, { ...data })
      .then(() => {
        response.successed(res, { name, url }, STRINGS.updated)
      })
      .catch(err => {
        response.failed(res, err.message)
      })
  } catch (err) {
    response.failed(res, err.message)
  }
}

exports.createPostCategory = async (req, res) => {
  try {
    const { name } = req.body
    let { url } = req.body

    url = await dbc.UrlGenerator(url || name, 'postCategory')
    const postCategory = await PostCategory.create({ name, url })

    response.successed(res, postCategory, STRINGS.created)
  } catch (error) {
    response.failed(res, err.message)
  }
}

exports.deletePostCategory = async (req, res) => {
  try {
  } catch (error) {
    response.failed(res, err.message)
  }
}
