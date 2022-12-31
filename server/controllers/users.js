const { response, user } = require('../classes')
const User = require('../models/user')
const Role = require('../models/role')
var bcrypt = require('bcryptjs')

exports.getUser = async (req, res) => {
  try {
    res.json(new response.success(res.user))
  } catch (err) {
    res.status(500).json(new response.fail(err.message))
  }
}

exports.updateUser = async (req, res) => {
  try {
    let anyError = []
    const { username, email, password } = req.body

    if (username && username.length < 8) {
      anyError.push('Username should be more than 7 characters.')
    }

    if (email && !user.mail.validateEmail(email)) {
      anyError.push('Email adress should be a valid email.')
    }

    if (password && password.length < 8) {
      anyError.push('Password should be more than 7 characters.')
    }

    const roles = await Role.find({ name: { $in: req.body.roles } })
    if (roles.length == 0) {
      anyError.push('User should have at least a role.')
    }

    if (anyError.length > 0) {
      res.status(400).json(new response.fail(anyError))
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

      res.user.newRoles = roles.map(role => role._id)

      await res.user.save()
      res.json(new response.dynamic(['_id', 'username', 'email', 'roles'], res.user))
    }
  } catch (error) {
    return res.status(500).json(new response.fail(err.message))
  }
}

exports.deleteUser = async (req, res) => {
  try {
    await res.user.remove()
    res.json(new response.success(null, 'User is deleted'))
  } catch (err) {
    return res.status(500).json(new response.fail(err.message))
  }
}

exports.createUser = async (req, res) => {
  try {
    res.json(new response.success(res.user, 'User is created'))
  } catch (error) {
    return res.status(500).json(new response.fail(err.message))
  }
}
