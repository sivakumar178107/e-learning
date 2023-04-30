const { Cource, CourceVideo, VideoCollection, User, Question, } = require("../models")
const { handleError, handleResponse } = require("../utils/helpers")
const { createCource, updateCource } = require("../utils/common")


var fs = require('fs');
const path = require("path");
const videoCollection = require("../models/videoCollection");
const user = require("../models/user");


exports.create = async (req, res) => {

    const { error } = createCource.validate(req.body, { abortEarly: false })

    if (error) {
        return handleError(error, 400, res)
    }


    const { name, description, about_cource, language, date, status } = req.body
    const fileUrl = req.file ? req.file.mimetype.split('/') : null
    const newFileURL = fileUrl ? fileUrl[0] : ""

    let file_URL = "";
    if (req.file) {
        switch (newFileURL) {
            case "image":
                file_URL = `/media/${req.file.filename}`
                break;
            case "audio":
                file_URL = `/media/${req.file.filename}`
                break;
            case "video":
                file_URL = `/media/${req.file.filename}`
                break;
            case "application":
                file_URL = `/media/${req.file.filename}`
                break;

            default:
                break;
        }
    }

    let data = ({
        name,
        description,
        about_cource,
        language,

        file_URL,
        file_size: req.file?.size ? req.file.size : 0,
        type: newFileURL ? newFileURL : null,
        original_file_name: req.file?.originalname,
        file_name: req.file?.filename,
        date: date,
        status,
        faculty_id : req.user.id
    })

    const newCource = new Cource(data);

    try {

        await newCource.save()

        const datad = { ...newCource._doc, }

        handleResponse(res, datad, 201)
    }

    catch (error) {
        res.status(400).send({ error: error.message })
    }
}

exports.findAll = async (req, res) => {

    const cource = await Cource.find().then(async data => {

        handleResponse(res, data, 200)

    }).catch(err => {
        handleError(err, 400, res)
    })
}

exports.searchCource = async (req, res) => {
    const cource = await Cource.find({
        $or: [
            {
                name: {
                    '$regex': req.query.q
                },

            },
            {
                language: {
                    '$regex': req.query.q
                },

            }, {
                description: {
                    '$regex': req.query.q
                },

            },

        ]
    })
        .then(async data => {
            handleResponse(res, data, 200)

        }).catch(err => {
            handleError(err, 400, res)
        })
}

exports.update = async (req, res) => {

    const { error } = updateCource.validate(req.body, { abortEarly: false })

    if (error) {
        return handleError(error, 400, res)
    }


    const { name, description, about_cource, language, date, status } = req.body

    const fileUrl = req.file ? req.file.mimetype.split('/') : null
    const newFileURL = fileUrl ? fileUrl[0] : ""

    const course = await Cource.findOne({ _id: req.params.id })
    if (course === null) {
        handleError('Invalid Course Id', req, res)
    }
    else {
        let file_URL = "";
        if (req.file) {
            switch (newFileURL) {
                case "image":
                    file_URL = `/media/${req.file.filename}`
                    break;
                case "audio":
                    file_URL = `/media/${req.file.filename}`
                    break;
                case "video":
                    file_URL = `/media/${req.file.filename}`
                    break;
                case "application":
                    file_URL = `/media/${req.file.filename}`
                    break;

                default:
                    break;
            }
        }

        let data = {
            name,
            description,
            about_cource,
            language,

            file_URL,
            file_size: req.file?.size ? req.file.size : 0,
            type: newFileURL ? newFileURL : null,
            original_file_name: req.file?.originalname,
            file_name: req.file?.filename,
            date: date,
            status,
        }

        await Cource.updateOne({ _id: req.params.id }, data, { new: true })
            .then(data => {
                if (req.file) {
                    try {
                        const filePath = path.join(__dirname, `../upload/${course?.file_URL.replace("/media", "/")}`,)
                        fs.unlinkSync(filePath);
                    }
                    catch (error) {
                        console.log('error>>>', error);
                    }
                }

                handleResponse(res, 'Cource updated successfully')
            }).catch(err => {
                handleError(err.message, 400, res)
            })
    }

}

//********************************************* Delete course ****************************************************************//

exports.delete = async (req, res) => {

    await User.findOne({ _id: req.user.id }).then(async (userData) => {

        if (userData.role === 'faculty') {

            await Cource.findOne({ _id: req.params.id }).then(async (data) => {

                if (data === null) {
                    handleError('Invalid course Id', 400, res)
                    return
                }

                const cource_ids = []

                const cource_video_id = []
                const imageFile_URL = []

                const fileUrl = data && data?.file_URL.replace("/media", "/")
                const fileName = path.join(__dirname, `../upload/${fileUrl}`,)

                const cId = data._id

                await Cource.deleteOne({ _id: data._id }).then(async (result) => {
                    fs.unlinkSync(fileName)
                    console.log('Cource file deleted successfully ')

                    //************************************** Fine tune 1 ********************************************//

                    await CourceVideo.find({ cource_id: cId, }).then(async (result) => {

                        console.log('result>>>>>>>>>>>>>>>>>>>>>>>>', result);

                        result.forEach(val => {

                            cource_video_id.push(val._id)

                            let newFileUrl = val.imageFile_URL.replace("/media", "/")

                            let newFileName = path.join(__dirname, `../upload/${newFileUrl}`,)

                            imageFile_URL.push(newFileName)
                        });

                        await CourceVideo.deleteMany({ cource_id: { $in: cId } }).then(async (dt) => {
                            imageFile_URL.forEach(val => {

                                fs.unlinkSync(val)
                                console.log('Image File deleted successfully')
                            })

                            await Question.deleteMany({ video_id: { $in: cource_video_id } })

                            //************************************** Fine tune 2 ********************************************//

                            const videoFilesName = []
                            const documentFilesName = []

                            await VideoCollection.find({ cource_video_Id: { $in: cource_video_id } }).then(async (videData) => {

                                videData.forEach(item => {

                                    let newVideoFileUrl = item.videoFile_URL.replace("/media", "/")

                                    let newVideoFileName = path.join(__dirname, `../upload/${newVideoFileUrl}`,)

                                    let newDocsFileUrl = item.documentFile_URL.replace("/media", "/")

                                    let newDocsFileName = path.join(__dirname, `../upload/${newDocsFileUrl}`,)

                                    videoFilesName.push(newVideoFileName)
                                    documentFilesName.push(newDocsFileName)
                                })

                                await VideoCollection.deleteMany({ cource_id: { $in: cource_ids } }).then(dt => {

                                    videoFilesName.forEach(val => {
                                        fs.unlinkSync(val)
                                        console.log('Video files deleted successfully')
                                    })

                                    documentFilesName.forEach(val => {
                                        fs.unlinkSync(val)
                                        console.log('Document files  File deleted successfully ')
                                    })

                                }).catch(err => {
                                    handleError(err.message, 400, res)
                                })
                            })

                        })
                            .catch(err => {
                                handleError(err.message, 400, res)
                            })

                    }).catch(err => {
                        handleError(err.message, 400, res)
                    })
                })
                    .catch(err => {
                        handleError(err.message, 400, res)
                    })

                handleResponse(res, 'cource delete successsfully', 200)

            }).catch(err => {
                handleError(err.message, 400, res)
            })

        }
        else {


            handleError('Course must be delete only facult', 400, res)
            return
        }



    }).catch(err => {
        handleError(err.message, 400, res)
    })





}

