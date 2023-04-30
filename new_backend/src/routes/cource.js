var router = require('express').Router();
const { cources } = require('../controllers/index');
const { fileUploader, multipleFileUploading } = require('../middleware/middleware');



module.exports = app => {

    router.post('/cource', fileUploader, cources.create)

    router.get('/cources', cources.findAll,)

    router.get('/searchCources', cources.searchCource)

    router.patch('/cource/:id', fileUploader, cources.update,)

    router.delete('/cources/:id', cources.delete,)

    app.use('/api', router);
}