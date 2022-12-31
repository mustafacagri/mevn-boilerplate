const { response } = require('../classes')

exports.allAccess = (req, res) => {
  res.status(200).send(new response.success(null, 'Public Content.'))
}

exports.userAccess = (req, res) => {
  res.status(200).send(new response.success(null, 'User Content.'))
}

exports.adminAccess = (req, res) => {
  res.status(200).send(new response.success(null, 'Admin Content.'))
}

exports.moderatorAccess = (req, res) => {
  res.status(200).send(new response.success(null, 'Moderator Content.'))
}
