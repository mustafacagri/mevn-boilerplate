const express = require('express')
const router = express.Router()
const { getPost, getPostByCategory } = require('../../middlewares/post')
const controller = require('../../controllers/posts')
const { getGeneric } = require('../../controllers/generic')
const dbQuery = require('../../middlewares/utils/dbQuery')
const PostCategory = require('../../models/postCategory')
const Post = require('../../models/post')
const multer = require('multer')
const { dbc } = require('../../classes')
const mime = require('mime-types')

const DIR = './public/images/posts/'
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR)
  },
  filename: async (req, file, cb) => {
    const url = await dbc.UrlGenerator(req.body.url || req.body.title, 'post') // use
    const fileName = `${url}.${mime.extension(file.mimetype)}`

    cb(null, fileName)
  }
})

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg') {
      cb(null, true)
    } else if (!req.body._id) {
      cb(null, false)
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'))
    }
  }
})

router.route('/categories/:id').get(getPostByCategory, controller.getPostsByCategoryId)

// {{apiURL}}admin/posts?postCategories[in]=638a63e9e128b806a49e8caa&page=2
router
  .route('/')
  .get(dbQuery(Post, [{ path: 'postCategories', select: 'name', sort: [['createdTime', 'desc']] }]), getGeneric)
  .post(upload.single('files'), controller.createPost)

router
  .route('/:id')
  .get(getPost, controller.getPost)
  .put([getPost, upload.single('files')], controller.updatePost)
  .delete(getPost, controller.deletePost)

router.route('/:id/comments/:commentId').put(getPost, controller.updateComment)

module.exports = router
