var router = require('express').Router()
const { helpDesks } = require('../controllers')


module.exports = app => {

    router.post('/help-desks', helpDesks.create)
    router.get('/help-desks', helpDesks.findAll)


    app.use('/api', router)
}