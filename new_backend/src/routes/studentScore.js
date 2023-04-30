var router = require('express').Router()
const { studentAnswers } = require('../controllers')


module.exports = app => {

    router.get('/student-score/:course_id', studentAnswers.getOverAllScore)


    app.use('/api', router)
}