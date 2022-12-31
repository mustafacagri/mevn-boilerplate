const express = require('express')
const router = express.Router()
const controller = require('../../controllers/admin/check')

router.get('/', controller.check)

module.exports = router
