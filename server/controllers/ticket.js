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

    const tickets = await Ticket.aggregate([
      {
        $match: { ...query } // Your match conditions here
      },
      {
        $addFields: {
          commentsCount: { $size: '$comments' }
        }
      },
      {
        $project: {
          comments: 0, // Exclude the comments array if you don't need it
          __v: 0 // Exclude the __v field if you don't need it
        }
      },
      {
        $sort: { lastUpdatedDate: -1 }
      },
      {
        $lookup: {
          from: 'ticketstatuses',
          localField: 'status',
          foreignField: '_id',
          as: 'status',
          pipeline: [{ $project: { _id: 1, name: 1 } }]
        }
      },
      {
        $lookup: {
          from: 'ticketpriorities',
          localField: 'priority',
          foreignField: '_id',
          as: 'priority',
          pipeline: [{ $project: { _id: 1, name: 1 } }]
        }
      },
      {
        $lookup: {
          from: 'users', // Assuming the users collection is named 'users'
          localField: 'customer',
          foreignField: '_id',
          as: 'customer',
          pipeline: [{ $project: { username: 1 } }]
        }
      },
      {
        $lookup: {
          from: 'users', // Assuming the users collection is named 'users'
          localField: 'lastUpdatedBy',
          foreignField: '_id',
          as: 'lastUpdatedBy',
          pipeline: [{ $project: { username: 1 } }]
        }
      },
      {
        $addFields: {
          status: { $arrayElemAt: ['$status', 0] },
          priority: { $arrayElemAt: ['$priority', 0] },
          customer: { $arrayElemAt: ['$customer', 0] },
          lastUpdatedBy: { $arrayElemAt: ['$lastUpdatedBy', 0] }
        }
      }
    ])

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
