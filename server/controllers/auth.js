const config = require('../config/auth')
const Role = require('../models/role')
const User = require('../models/user')
const { response } = require('../classes')
const { controllers: { auth: STRINGS } = {} } = require('../MAGIC_STRINGS')

var jwt = require('jsonwebtoken')
var bcrypt = require('bcryptjs')

exports.signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  })

  user.save((err, user) => {
    if (err) {
      return res.status(500).send(new response.fail(err))
    }

    if (req.body.roles) {
      Role.find({ name: { $in: req.body.roles } }, (err, roles) => {
        // this part should be updated if the user roles should not be chosen from users
        if (err) {
          return res.status(500).send(new response.fail(err))
        }

        user.roles = roles.map(role => role._id)
        user.save(err => {
          if (err) {
            return res.status(500).send(new response.fail(err))
          }

          signin(req, res) // if everything is ok, we are gonna signin automatically
        })
      })
    } else {
      Role.findOne({ name: 'user' }, (err, role) => {
        if (err) {
          return res.status(500).send(new response.fail(err))
        }

        user.roles = [role._id]
        user.save(err => {
          if (err) {
            return res.status(500).send(new response.fail(err))
          }

          signin(req, res) // if everything is ok, we are gonna signin automatically
        })
      })
    }
  })
}

const signin = (req, res) => {
  User.findOne({
    username: req.body.username
  })
    .populate('roles', '-__v')
    .exec((err, user) => {
      if (err) {
        return res.status(500).send(new response.fail(err))
      }

      if (!user) {
        return response.failed(res, STRINGS.userNotFound, 200)
      }

      const passwordIsValid = bcrypt.compareSync(req.body.password, user.password)

      if (!passwordIsValid) {
        return response.failed(res, STRINGS.invalidPassword, 200)
      }

      const { id, username, email, roles } = user // we will send the user data except password
      let expiresIn = 86400 // 24 hours

      if (req.body.remember === true) {
        expiresIn *= 100 // it will be 100 days
      }

      const token = jwt.sign({ id }, config.secret, {
        expiresIn
      })

      res.status(200).send(
        new response.success({
          id,
          username,
          email,
          roles,
          accessToken: token
        })
      )
    })
}

exports.signin = signin
