const { VideoCollection } = require("../models")
const { handleResponse, handleError } = require("../utils/helpers")

exports.findAll = async (req, res) => {
    const courceVideo = await VideoCollection.find().then(data => { handleResponse(res, data, 200) }).catch(err => { handleError(err, 400, res) })
}

exports.getVideoCollectionByCourceVideo = async (req, res) => {

    await VideoCollection.findOne({ cource_video_Id: req.params.id })
        .then(data => {
            handleResponse(res, data, 200)
        }).catch(err => { handleError(err, 400, res) })
}
exports.getVideoCollectionByCource = async (req, res) => {

    await VideoCollection.find({ course_Id: req.params.id })

        .then(data => {
            const documents = []

            for (let index = 0; index < data.length; index++) {
                const element = data[index];
                documents.push(element.documentFile_URL)
            }

            handleResponse(res, data, 200)
        }).catch(err => { handleError(err, 400, res) })
}