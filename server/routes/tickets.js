const express = require('express')
const router = express.Router()
const dbQuery = require('../middlewares/utils/dbQuery')
const authJwt = require('../middlewares/user/authJwt')
const { getTicket } = require('../middlewares/ticket')
const { getGeneric } = require('../controllers/generic')
const { TicketStatus, TicketPriority } = require('../models/ticket')
const controller = require('../controllers/ticket')

router.use(authJwt.verifyToken)

router.route('/').post(controller.createTicket).get(controller.ticketsByUser)

router.route('/statuses').get(dbQuery(TicketStatus), getGeneric)
router.route('/priorities').get(dbQuery(TicketPriority), getGeneric)

router.route('/:id').get(getTicket, controller.ticketById).post(getTicket, controller.createComment)

module.exports = router
