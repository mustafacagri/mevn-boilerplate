const { response } = require('../../classes')
const Role = require('../../models/role')
const PostCategory = require('../../models/postCategory')
const Post = require('../../models/post')
const slug = require('slug')

const { TicketStatus, TicketPriority } = require('../../models/ticket')
const { TodoStatus, TodoPriority } = require('../../models/todo')

async function init(req, res, next) {
  // here we are creating the user roles initially

  const newRoles = []
  const newCategories = []
  const newPosts = []

  const newTicketStatuses = []
  const newTicketPriorities = []

  const newTodoStatuses = []
  const newTodoPriorities = []

  await Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      const roles = ['user', 'moderator', 'admin']
      roles.forEach(name => {
        new Role({ name }).save(err => {
          if (err) console.log('error', err)
          newRoles.push(`added '${name}' to roles collection`)
        })
      })
    }
  })

  // here we are creating the post & post categories initially

  await PostCategory.estimatedDocumentCount(async (err, count) => {
    if (!err && count === 0) {
      const categories = ['Test Category', 'General', 'Technology']
      const posts = [
        { title: 'Post 1', description: 'Description 1' },
        { title: 'Post 2', description: 'Description 2' },
        { title: 'Post 3', description: 'Description 3' }
      ]

      for (const [index, name] of categories.entries()) {
        const url = slug(name)
        const category = await PostCategory.create({ name, url })

        const post = posts[index]
        post.postCategories = category._id
        post.url = slug(post.title)

        await Post.create({ ...post })

        newCategories.push(`added '${name}' to post categories collection`)
        newPosts.push(`added '${post.name}' to posts collection`)
      }
    }
  })

  await TicketPriority.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      const priorities = ['Lowest', 'Lower', 'Medium', 'Higher', 'Highest']

      for (const [order, name] of priorities.entries()) {
        new TicketPriority({ name, order }).save(err => {
          if (err) console.log('error', err)
          newTicketPriorities.push(`added '${name}' to ticket priorities collection`)
        })
      }
    }
  })

  await TicketStatus.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      const statuses = ['Open', 'In Progress', 'On Hold', 'Closed', 'Resolved']

      for (const [order, name] of statuses.entries()) {
        new TicketStatus({ name, order }).save(err => {
          if (err) console.log('error', err)
          newTicketStatuses.push(`added '${name}' to ticket statuses collection`)
        })
      }
    }
  })


  await TodoPriority.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      const priorities = ['Lowest', 'Lower', 'Medium', 'Higher', 'Highest']

      for (const [order, name] of priorities.entries()) {
        new TodoPriority({ name, order }).save(err => {
          if (err) console.log('error', err)
          newTodoPriorities.push(`added '${name}' to todo priorities collection`)
        })
      }
    }
  })

  await TodoStatus.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      const statuses = ['Open', 'In Progress', 'On Hold', 'Closed', 'Resolved']

      for (const [order, name] of statuses.entries()) {
        new TodoStatus({ name, order }).save(err => {
          if (err) console.log('error', err)
          newTodoStatuses.push(`added '${name}' to todo statuses collection`)
        })
      }
    }
  })

  response.successed(res, { newRoles, newCategories, newPosts, newTicketPriorities, newTicketStatuses, newTodoPriorities, newTodoStatuses })
}

module.exports = init
