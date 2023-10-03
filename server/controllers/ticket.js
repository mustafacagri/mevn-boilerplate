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

exports.ticketsByUser = async (req, res) => {
  try {
    const { user } = res
    const query = { customer: user._id }
    const { lastUpdatedDate } = req?.query

    if (lastUpdatedDate) {
      query.lastUpdatedDate = { $gt: lastUpdatedDate }
    }

    const tickets = await Ticket.find({ ...query }, { comments: 0, __v: 0 })
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
    const { id } = req.params
    const { user } = res

    const ticket = await Ticket.findOne({ _id: id, customer: user._id }, { comments: 1 })
    res.ticket.comments = ticket.comments

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

    const ticket = await Ticket.findOne({ _id: id, customer: user._id })

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
