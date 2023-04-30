var router = require('express').Router()
const { options } = require('../controllers')


module.exports = app => {

    router.post('/options', options.create)
    router.get('/options', options.findAll)
    // router.get('/questions/:id', questions.findOne)
    // router.patch('/questions/:id', questions.update)
    // router.delete('/questions/:id', questions.delete)


    app.use('/api', router)
}