const mongoose = require('mongoose')

const postCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  }
})

// implement the deletion of posts after the post category. we will delete the posts which are in the post category

module.exports = mongoose.model('PostCategory', postCategorySchema)
