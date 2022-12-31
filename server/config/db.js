const mongoose = require('mongoose')
const Role = require('../models/role')

mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
db.on('error', error => console.log(error))
db.once('open', () => {
  console.log('Connected to database')
  init() // you can remove this row after first time executing
})

function init() {
  // initialize our roles for the first time working
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      const roles = ['user', 'moderator', 'admin']
      roles.forEach(name => {
        new Role({ name }).save(err => {
          if (err) console.log('error', err)
          console.log(`added '${name}' to roles collection`)
        })
      })
    }
  })
}
