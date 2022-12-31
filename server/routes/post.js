const express = require('express')
const router = express.Router()
const controller = require('../controllers/post')

router.use(function (req, res, next) {
  res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept')
  next()
})

module.exports = router
