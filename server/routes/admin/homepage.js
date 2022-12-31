const express = require('express')
const router = express.Router()
const controller = require('../../controllers/admin/homepage')
const { getGeneric } = require('../../controllers/generic')
const dbQuery = require('../../middlewares/utils/dbQuery')
const User = require('../../models/user')



router
  .get('/stats', controller.getStats)


module.exports = router
