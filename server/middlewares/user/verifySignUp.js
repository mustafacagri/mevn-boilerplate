const { response } = require('../../classes')
const ROLES = require('../../models/role')
const User = require('../../models/user')

checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  User.findOne({
    username: req.body.username
  }).exec((err, user) => {
    if (err) {
      return res.status(500).send({ message: err })
    }

    if (user) {
      return res.status(400).send({ message: 'Failed! Username is already in use!' })
    }

    // Email
    User.findOne({
      email: req.body.email
    }).exec((err, user) => {
      if (err) {
        return res.status(500).send({ message: err })
      }

      if (user) {
        return res.status(400).send({ message: 'Failed! Email is already in use!' })
      }

      next()
    })
  })
}

checkRolesExisted = (req, res, next) => {
  //
  //    needs to be refactored => for loop
  //

  if (req.body.roles) {
    // for (let i = 0; i < req.body.roles.length; i++) {
    for (const item of req.body.roles) {
      ROLES.findOne({
        name: item
      }).exec((err, role) => {
        if (err) {
          return res.status(500).send({ message: err })
        }

        if (!role) {
          return res.status(400).send({ message: 'Failed! Role ${req.body.roles[i]} does not exist!' })
        }
      })
    }
  }
  next()
}

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted
}

module.exports = verifySignUp
