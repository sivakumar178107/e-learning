var router = require('express').Router()

const { courceVideos } = require('../controllers/index')

const { fileUploader, multipleFileUploading, } = require('../middleware/middleware')



module.exports = app => {

    router.post('/cource/video', multipleFileUploading, courceVideos.create,)

    router.get('/cource/videos', courceVideos.findAll,)

    router.get('/cource/videos/:cource_id', courceVideos.getCourceVideio)


    app.use('/api', router)
}