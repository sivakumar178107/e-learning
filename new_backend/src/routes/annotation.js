var router = require('express').Router()
const { annotations } = require('../controllers')


module.exports = app => {
    router.post('/annotations', annotations.create)
    router.get('/annotations', annotations.get)


    app.use('/api', router)
}