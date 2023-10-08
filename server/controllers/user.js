const config = require('../config/auth')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/user')
const { controllers: { users: STRINGS } = {} } = require('../MAGIC_STRINGS')

const { response } = require('../classes')

exports.allAccess = (req, res) => {
  response.successed(res, null, STRINGS.publicContent)
}

exports.userAccess = (req, res) => {
  response.successed(res, res.user, 'User Content.')
}

exports.adminAccess = (req, res) => {
  response.successed(res, null, STRINGS.adminContent)
}

exports.moderatorAccess = (req, res) => {
  response.successed(res, null, STRINGS.moderatorContent)
}

exports.update = async (req, res) => {
  const { password, repassword } = req.body
  let error

  if (password !== repassword) {
    error = STRINGS.passwordAndRepasswordMustBeTheSame
  }

  if (error) {
    response.failed(res, error)
  } else {
    const { _id: id } = res.user
    const user = await User.findById(id)

    user.password = bcrypt.hashSync(password, 8)
    await user.save()

    const expiresIn = 86400 // 24 hours
    const token = jwt.sign({ id }, config.secret, {
      expiresIn
    })

    response.successed(res, token, STRINGS.userUpdated)
  }
}
