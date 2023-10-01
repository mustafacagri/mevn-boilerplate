const { response } = require('../classes')
const { Ticket, TicketStatus } = require('../models/ticket')
const mongoose = require('mongoose')
const { controllers: { tickets: STRINGS } = {} } = require('../MAGIC_STRINGS')

exports.createTicket = async (req, res) => {
  try {
    const { description, priority, subject } = req.body

    let data = { description, priority, subject }

    if (res?.user) {
      await TicketStatus.findOne({ name: 'Open' }).then(status => {
        data.status = status._id // we are assinging the status as Open at the beginning of the creating ticket
      })

      data = { ...data, customer: res.user._id, lastUpdatedBy: res.user._id }
      const ticket = await Ticket.create({ ...data })

      response.successed(res, ticket, STRINGS.created)
    }
  } catch (error) {
    response.failed(res, error.message)
  }
}
