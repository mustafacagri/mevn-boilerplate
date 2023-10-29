const { response, user } = require('../classes')
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const { controllers: { users: STRINGS } = {} } = require('../MAGIC_STRINGS')

exports.getUser = async (req, res) => {
  try {
    const { _id, createdTime, email, isActive, roles, username } = res.user
    const user = { _id, createdTime, email, isActive, roles, username }

    response.successed(res, user)
  } catch (err) {
    res.status(200).json(new response.fail(err.message))
  }
}

exports.updateUser = async (req, res) => {
  try {
    let anyError = []
    const { _id, username, email, isActive, password } = req.body
    let { roles } = req.body

    if (username && username.length < 8) {
      anyError.push('Username should be more than 7 characters.')
    }

    if (email && !user.mail.validateEmail(email)) {
      anyError.push('Email adress should be a valid email.')
    }

    if (password && password.length < 8) {
      anyError.push('Password should be more than 7 characters.')
    }

    if (roles.length === 0) {
      anyError.push(STRINGS.rolesCanNotBeEmpty)
    } else {
      res.user.roles = roles.map(role => mongoose.Types.ObjectId(role._id))
    }

    if (anyError.length > 0) {
      response.failed(res, anyError)
    } else {
      if (username !== res.user.username) {
        res.user.username = username
      }

      if (email !== res.user.email) {
        res.user.email = email
      }

      if (password) {
        res.user.password = bcrypt.hashSync(password, 8)
      }

      if (isActive) {
        res.user.isActive = isActive
      }

      await res.user.save()
      response.successed(res, { _id, email, isActive, roles, username }, 'User has been successfully updated!')
    }
  } catch (err) {
    response.failed(res, err.message)
  }
}

exports.deleteUser = async (req, res) => {
  try {
    await res.user.remove()

    const { _id } = res.user
    response.successed(res, { _id }, STRINGS.userDeleted)
  } catch (err) {
    return res.status(200).json(new response.fail(err.message))
  }
}

exports.createUser = async (req, res) => {
  try {
    res.json(new response.success(req.params.id, 'User is created'))
  } catch (error) {
    return res.status(200).json(new response.fail(err.message))
  }
}
