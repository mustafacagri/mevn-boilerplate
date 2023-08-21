const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  createdTime: {
    type: Date,
    required: true,
    default: +new Date()
  },
  hit: {
    type: Number,
    required: false,
    default: 0
  },
  postCategories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PostCategory'
    }
  ],
  image: {
    type: String,
    default: ''
  },
  comments: { type: Array }
})

module.exports = mongoose.model('Post', postSchema)
