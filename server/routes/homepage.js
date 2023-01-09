const express = require('express')
const router = express.Router()
const controller = require('../controllers/homepage')

router.get('/stats', controller.getStats)

module.exports = router
