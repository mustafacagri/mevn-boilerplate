const mongoose = require('mongoose')

// Status Schema
const ticketStatusSchema = new mongoose.Schema({
  order: {
    type: Number,
    unique: true,
    required: true
  },
  name: {
    type: String,
    unique: true,
    required: true
  },
  description: String
})

// Priority Schema
const ticketPrioritySchema = new mongoose.Schema({
  order: {
    type: Number,
    unique: true,
    required: true
  },
  name: {
    type: String,
    unique: true,
    required: true
  },
  description: String
})

// Ticket Schema
const ticketSchema = new mongoose.Schema({
  subject: String,
  description: String,
  status: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TicketStatus'
  },
  priority: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TicketPriority'
  },
  createdTime: {
    type: Date,
    required: true,
    default: +new Date()
  },
  lastUpdatedDate: {
    type: Date,
    required: true,
    default: +new Date()
  },
  lastUpdatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  comments: [
    {
      comment: String,
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      createdTime: {
        type: Date,
        required: true,
        default: +new Date()
      }
    }
  ]
})

// Create models based on the schemas
const Ticket = mongoose.model('Ticket', ticketSchema)
const TicketStatus = mongoose.model('TicketStatus', ticketStatusSchema)
const TicketPriority = mongoose.model('TicketPriority', ticketPrioritySchema)

module.exports = {
  Ticket,
  TicketPriority,
  TicketStatus
}
