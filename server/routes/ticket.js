const express = require('express')
const router = express.Router()
const dbQuery = require('../middlewares/utils/dbQuery')
const authJwt = require('../middlewares/user/authJwt')
const { getGeneric } = require('../controllers/generic')
const { TicketStatus, TicketPriority } = require('../models/ticket')
const controller = require('../controllers/ticket')

router.use(authJwt.verifyToken)

router.route('/').post(controller.createTicket)

router.route('/statuses').get(dbQuery(TicketStatus), getGeneric)
router.route('/priorities').get(dbQuery(TicketPriority), getGeneric)

module.exports = router
