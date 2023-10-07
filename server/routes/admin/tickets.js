const express = require('express')
const router = express.Router()
const dbQuery = require('../../middlewares/utils/dbQuery')
const { getTicketAsAdmin } = require('../../middlewares/ticket')
const { getGeneric } = require('../../controllers/generic')
const { TicketStatus, TicketPriority } = require('../../models/ticket')
const controller = require('../../controllers/admin/ticket')

router.route('/').get(controller.tickets)

router.route('/statuses').get(dbQuery(TicketStatus), getGeneric)
router.route('/priorities').get(dbQuery(TicketPriority), getGeneric)

router.route('/:id').get(getTicketAsAdmin, controller.ticketById).post(getTicketAsAdmin, controller.createComment)

module.exports = router
