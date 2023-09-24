const config = require('../config/auth')
const Role = require('../models/role')
const User = require('../models/user')
const { response } = require('../classes')
const { controllers: { auth: STRINGS } = {} } = require('../MAGIC_STRINGS')

var jwt = require('jsonwebtoken')
var bcrypt = require('bcryptjs')

exports.signup = async (req, res) => {
  const { email, password, roles, username } = req.body

  try {
    const user = new User({
      username: username,
      email: email,
      password: bcrypt.hashSync(password, 8)
    })

    await user.save((err, user) => {
      if (err) {
        return res.status(200).send(new response.fail(err))
      }

      if (roles) {
        console.log('rolessss')
        Role.find({ name: { $in: roles } }, async err => {
          // this part should be updated if the user roles should not be chosen from users
          if (err) {
            return res.status(200).send(new response.fail(err))
          }

          user.roles = roles.map(role => role._id)
          await user.save((err, user) => {
            if (err) {
              return res.status(200).send(new response.fail(err))
            }

            // signin(req, res) // if everything is ok, we are gonna signin automatically
            // we disabled this feature for now since the user should be active first to be loged in

            res.status(200).send(
              response.successed(
                res,
                {
                  username,
                  email
                },
                STRINGS.userCreated
              )
            )
          })
        })
      } else {
        Role.findOne({ name: 'user' }, async (err, role) => {
          if (err) {
            return res.status(200).send(new response.fail(err))
          }

          user.roles = [role._id]
          await user.save(err => {
            if (err) {
              return res.status(200).send(new response.fail(err))
            }

            // signin(req, res) // if everything is ok, we are gonna signin automatically
            // we disabled this feature for now since the user should be active first to be loged in

            response.successed(
              res,
              {
                username,
                email
              },
              STRINGS.userCreated
            )
          })
        })
      }
    })
  } catch (error) {
    console.log(error.message)
  }
}

const signin = (req, res) => {
  User.findOne({
    username: req.body.username
  })
    .populate('roles', '-__v')
    .exec((err, user) => {
      if (err) {
        return res.status(200).send(new response.fail(err))
      }

      if (!user) {
        return response.failed(res, STRINGS.userNotFound, 200)
      }

      if (!user?.isActive) {
        return response.failed(res, STRINGS.userNotActive, 200)
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
