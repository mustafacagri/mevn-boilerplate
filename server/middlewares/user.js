const User = require('../models/user')
const { response } = require('../classes')


exports.getUser = async (req, res, next) => {
  let user
  try {
    user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).json(new response.fail('Can not find the user'))
    }
  } catch (err) {
    next(new response.fail())
  }
  res.user = user
  next()
}
