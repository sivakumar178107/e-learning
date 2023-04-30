var router = require('express').Router()
const { users } = require('../controllers/index')

module.exports = app => {

  router.post('/register', users.register)
  router.post('/users', users.findAll)


  app.use('/api', router)
}