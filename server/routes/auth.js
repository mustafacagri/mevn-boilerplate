const express = require('express')
const router = express.Router()
const verifySignUp = require('../middlewares/user/verifySignUp')
const controller = require('../controllers/auth')

router.use(function (req, res, next) {
  res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept')
  next()
})

router.post('/activate', controller.activate)
router.post('/signup', [verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted], controller.signup)
router.post('/signin', controller.signin)

module.exports = router
