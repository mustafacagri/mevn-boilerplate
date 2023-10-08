const express = require('express')
const router = express.Router()
const authJwt = require('../middlewares/user/authJwt')
const controller = require('../controllers/user')

router.use(function (req, res, next) {
  res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept')
  next()
})

// you can test your token with these URLs for authorization
router.get('/test/all', controller.allAccess)
router.get('/test/user', [authJwt.verifyToken], controller.userAccess)
router.get('/test/mod', [authJwt.verifyToken, authJwt.isModerator], controller.moderatorAccess)
router.get('/test/admin', [authJwt.verifyToken, authJwt.isAdmin], controller.adminAccess)
router.put('/update', [authJwt.verifyToken], controller.update)

module.exports = router
