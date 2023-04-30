var router = require('express').Router()


const { videoCollections } = require('../controllers');
const { fileUploader, multipleFileUploading } = require('../middleware/middleware');



module.exports = app => {

    // router.post('/cource', cources.create)

    router.get('/videoCollections', videoCollections.findAll)

    router.get('/videoCollections/:id', videoCollections.getVideoCollectionByCourceVideo)

    router.get('/videoCollections/course/:id', videoCollections.getVideoCollectionByCource)

    app.use('/api', router);
}