const mongoose = require('mongoose')

const { response } = require('../../classes')
const { Ticket, TicketStatus } = require('../../models/ticket')
const { controllers: { tickets: STRINGS } = {} } = require('../../MAGIC_STRINGS')

exports.tickets = async (req, res) => {
  try {
    const { lastUpdatedDate } = req?.query

    if (lastUpdatedDate) {
      query.lastUpdatedDate = { $gt: lastUpdatedDate }
    }

    const tickets = await Ticket.find({}, { comments: 0, __v: 0 })
      .populate({
        path: 'status',
        select: 'name'
      })
      .populate({
        path: 'priority',
        select: 'name'
      })
      .populate({
        path: 'customer',
        select: 'username'
      })
      .populate({
        path: 'lastUpdatedBy',
        select: 'username'
      })
      .sort({ lastUpdatedDate: -1 })

    response.successed(res, tickets)
  } catch (error) {
    response.failed(res, error.message)
  }
}

exports.ticketById = async (req, res) => {
  try {
    response.successed(res, res.ticket)
  } catch (error) {
    response.failed(res, error.message)
  }
}

exports.createComment = async (req, res) => {
  try {
    const { id } = req.params
    const { user } = res
    const { comment } = req.body

    const ticket = await Ticket.findOne({ _id: id })

    const _id = mongoose.Types.ObjectId()
    const data = { _id, comment, user: user._id, createdTime: +new Date() }
    ticket.comments.push({ ...data })
    ticket.lastUpdatedDate = +new Date()
    ticket.lastUpdatedBy = user._id
    await ticket.save()

    response.successed(res, data, STRINGS.commentCreated)
  } catch (error) {
    response.failed(res, null, error.message)
  }
}
