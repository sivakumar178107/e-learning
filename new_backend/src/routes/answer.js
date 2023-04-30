var router = require('express').Router()
const { answers } = require('../controllers')


module.exports = app => {

    router.post('/answers', answers.create)

    router.get('/answers', answers.findAll)
    router.get('/answers/:id', answers.findOne)

    router.patch('/answers/:id', answers.update)


    app.use('/api', router)
}