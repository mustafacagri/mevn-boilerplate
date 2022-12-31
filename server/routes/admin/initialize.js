const express = require('express')
const router = express.Router()
const controller = require('../../controllers/admin/initialize')

router.get('/', controller)

module.exports = router
