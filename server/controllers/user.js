const { response } = require('../classes')

exports.allAccess = (req, res) => {
  response.successed(res, null, 'Public Content.')
}

exports.userAccess = (req, res) => {
  response.successed(res, res.user, 'User Content.')
}

exports.adminAccess = (req, res) => {
  response.successed(res, null, 'Admin Content.')
}

exports.moderatorAccess = (req, res) => {
  response.successed(res, null, 'Moderator Content.')
}
