const { response } = require('../../classes')
const ROLES = require('../../models/role')
const User = require('../../models/user')

checkDuplicateUsernameOrEmail = async (req, res, next) => {
  const { email, username } = req.body
  // Username
  User.findOne({
    username
  }).exec((err, user) => {
    if (err) {
      return res.status(200).send({ message: err })
    }

    if (user) {
      return res.status(200).send(new response.fail('Failed! Username is already in use!'))
    }

    // Email
    User.findOne({
      email
    }).exec((err, user) => {
      if (err) {
        return res.status(200).send({ message: err })
      }

      if (user) {
        return res.status(200).send(new response.fail('Failed! Email is already in use!'))
      }

      next()
    })
  })
}

checkRolesExisted = (req, res, next) => {
  const { roles } = req.body
  //
  //    needs to be refactored => for loop
  //

  if (roles) {
    // for (let i = 0; i < req.body.roles.length; i++) {
    for (const item of roles) {
      ROLES.findOne({
        name: item
      }).exec((err, role) => {
        if (err) {
          return res.status(200).send({ message: err })
        }

        if (!role) {
          return res.status(400).send({ message: 'Failed! Role ${roles[i]} does not exist!' })
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
