const { response } = require('../../classes')
const Role = require('../../models/role')
const PostCategory = require('../../models/postCategory')
const Post = require('../../models/post')
var slug = require('slug')

async function init(req, res, next) {
  // here we are creating the user roles initially

  const newRoles = []
  const newCategories = []
  const newPosts = []

  Role.estimatedDocumentCount((err, count) => {
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

  PostCategory.estimatedDocumentCount(async (err, count) => {
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

  return res.json(new response.success({ newRoles, newCategories, newPosts }))
}

module.exports = init
