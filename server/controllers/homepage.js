const { response } = require('../classes')
const User = require('../models/user')
const Post = require('../models/post')
const PostCategory = require('../models/postCategory')

exports.getStats = async (req, res) => {
  try {
    const userCount = await User.countDocuments()
    const postCount = await Post.countDocuments()
    const postCategoryCount = await PostCategory.countDocuments()

    // REFACTOR THIS!!! There must be better solution for this
    const postHitsAgg = await Post.aggregate([
      { $match: { hit: { $gte: 0 } } },
      {
        $group: {
          _id: null,
          hits: { $sum: '$hit' }
        }
      }
    ])

    const postHits = postHitsAgg.length > 0 && postHitsAgg[0]?.hits

    const data = { count: { user: userCount, post: postCount, postCategory: postCategoryCount, postHits } }

    response.successed(res, data)
  } catch (err) {
    response.failed(res, err.message)
  }
}

// const { response } = require('../classes')
// // const PostCategory = require('../models/user')

// exports.getPostCategory = async (req, res) => {
//   try {
//     res.json(new response.success(res.postCategory))
//   } catch (err) {
//     res.status(500).json(new response.fail(err.message))
//   }
// }
