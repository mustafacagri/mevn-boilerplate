const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const config = require('../../config/auth')
const Role = require('../../models/role')
const User = require('../../models/user')
const { response } = require('../../classes')
const { middlewares: { user: { authJWT: STRINGS } } = {} } = require('../../MAGIC_STRINGS')

router.use(function (req, res, next) {
  res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept')
  next()
})

verifyToken = async (req, res, next) => {
  const token = req.headers['x-access-token']

  if (!token) {
    return res.status(200).send(new response.fail(STRINGS.noToken))
  }

  jwt.verify(token, config.secret, async (err, decoded) => {
    if (err) {
      return res.status(200).send(new response.fail(STRINGS.unauthorized))
    }

    req.userId = decoded.id
    const user = await User.findById(decoded.id)

    if (user) {
      const { _id, createdTime, email, isActive, roles, username } = user
      res.user = { _id, createdTime, email, isActive, roles, username }
    }

    next()
  })
}

isAdmin = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send(new response.fail(err))
      return
    }

    if (user?.roles) {
      Role.find(
        {
          _id: { $in: user.roles }
        },
        (err, roles) => {
          if (err) {
            res.status(500).send(new response.fail(err))
            return
          }

          for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === 'admin') {
              next()
              return
            }
          }

          response.failed(res, STRINGS.requireAdmin)
          return
        }
      )
    }
  })
}

isModerator = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send(new response.fail(err))
      return
    }
    Role.find(
      {
        _id: { $in: user.roles }
      },
      (err, roles) => {
        if (err) {
          res.status(500).send(new response.fail(err))
          return
        }
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === 'moderator') {
            next()
            return
          }
        }
        res.status(403).send(new response.fail('Require Moderator Role!'))
        return
      }
    )
  })
}

const authJwt = {
  verifyToken,
  isAdmin,
  isModerator
}
module.exports = authJwt
