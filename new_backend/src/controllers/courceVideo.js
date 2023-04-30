const { CourceVideo, Cource, VideoCollection } = require("../models");
const { handleError, handleResponse } = require("../utils/helpers");

exports.create = async (req, res) => {

    //**************image*****************/
    const imageFileUrl = req.files.image === undefined ? null : req.files.image[0].mimetype.split('/')
    const newImageFileURL = imageFileUrl ? imageFileUrl[0] : ""
    //**************gallery*****************/
    const videoFileUrl = req.files?.gallery === undefined ? null : req.files.gallery[0].mimetype.split('/')
    const newVideoFileURL = videoFileUrl ? videoFileUrl[0] : ""

    //**************gallery*****************/
    const docsFileUrl = req.files?.document === undefined ? null : req.files.document[0].mimetype.split('/')
    const newDocsFileURL = docsFileUrl ? docsFileUrl[0] : ""

    const { title, cource_id, sort_description, description, } = req.body

    const cource = await Cource.findOne({ _id: req.body.cource_id }).then(async (data) => {

        let documentFile_URL

        if (req.files?.document === undefined) {
            documentFile_URL = null
        } else {
            documentFile_URL = `/media/${req.files?.document[0].filename}`
        }

        let imageFile_URL

        if (req.files?.image === undefined) {
            imageFile_URL = null
        } else {
            imageFile_URL = `/media/${req.files?.image[0].filename}`
        }

        let videoFile_URL

        if (req.files?.gallery === undefined) {
            videoFile_URL = null
        } else {
            videoFile_URL = `/media/${req.files?.gallery[0].filename}`
        }

        let datas = ({

            title,
            cource_id,
            sort_description,
            description,
            //************Image*************//
            imageOriginal_file_name: req.files?.image === undefined ? null : req.files?.image[0].originalname,
            imageFile_name: req.files?.image === undefined ? null : req.files?.image[0]?.filename,
            imageType: newImageFileURL ? newImageFileURL : null,
            imageFile_URL,
            imageFile_size: req.files?.image === undefined ? 0 : req.files?.image[0].size ? req.files?.image[0].size : 0,

        })

        const newCourceVideo = new CourceVideo(datas);

        try {
            await newCourceVideo.save()

            const videoData = {
                title: newCourceVideo.title,
                cource_video_Id: newCourceVideo._id,
                course_Id: cource_id,
                sort_description: newCourceVideo.sort_description,
                description: newCourceVideo.description,

                videoOriginal_file_name: req.files?.gallery === undefined ? null : req.files?.gallery[0]?.originalname,
                videoFile_name: req.files?.gallery === undefined ? null : req.files?.gallery[0]?.filename,
                videoType: newVideoFileURL ? newVideoFileURL : null,
                videoFile_URL,
                videoFile_size: req.files?.gallery === undefined ? 0 : req.files?.gallery[0].size ? req.files?.gallery[0].size : 0,

                documentOriginal_file_name: req.files?.document === undefined ? null : req.files?.document[0]?.originalname,
                documentFile_name: req.files?.document === undefined ? null : req.files?.document[0]?.filename,
                documentType: newDocsFileURL ? newDocsFileURL : null,
                documentFile_URL,
                documentFile_size: req.files?.document === undefined ? 0 : req.files?.document[0].size ? req.files?.document[0].size : 0,

            }

            const videoCollection = new VideoCollection(videoData)
            await videoCollection.save()
            const datad = { ...newCourceVideo._doc, videoCollection }


            handleResponse(res, datad, 201)
        }

        catch (error) {
            res.status(400).send({ error: error.message })
        }
    }).catch(err => {
        return handleError(err, 400, res)
    })











































    // const file_URL = []
    // const original_file_name = []
    // const file_name = []
    // const file_size = []
    // const newFileURL = []

    // //             file_size: req.file?.size ? req.file.size : 0,
    // //             type: newFileURL ? newFileURL : null,
    // //             original_file_name: req.file?.originalname,
    // //             file_name: req.file?.filename,

    // const x = req.files.map((value) => {
    //     newFileURL.push(value.mimetype.split('/')[0])
    //     file_name.push(value.filename)
    //     original_file_name.push(value.originalname)
    //     file_URL.push(`/media/images/${value.filename}`)
    //     file_size.push(value.size)

    // })

    // const { title, cource_id } = req.body

    // const cource = await Cource.findOne({ _id: req.body.cource_id })

    //     .then(async (data) => {

    //         // const fileUrl = req.file ? req.file.mimetype.split('/') : null
    //         // const newFileURL = fileUrl ? fileUrl[0] : ""
    //         // let file_URL = "";

    //         // if (req.file) {
    //         //     switch (newFileURL) {
    //         //         case "image":
    //         //             file_URL = `/media/images/${req.file.filename}`
    //         //             break;
    //         //         case "audio":
    //         //             file_URL = `/media/audio/${req.file.filename}`
    //         //             break;
    //         //         case "video":
    //         //             file_URL = `/media/videos/${req.file.filename}`
    //         //             break;
    //         //         case "application":
    //         //             file_URL = `/media/docs/${req.file.filename}`
    //         //             break;

    //         //         default:
    //         //             break;
    //         //     }
    //         // }

    //         // let datas = ({

    //         //     title,
    //         //     file_URL,

    //         //     file_size: req.file?.size ? req.file.size : 0,
    //         //     type: newFileURL ? newFileURL : null,
    //         //     original_file_name: req.file?.originalname,
    //         //     file_name: req.file?.filename,

    //         //     cource_id,
    //         // })

    //         let datas = ({

    //             title,
    //             file_URL,
    //             file_size: file_size ? file_size : 0,
    //             type: newFileURL ? newFileURL : null,
    //             original_file_name: original_file_name,
    //             file_name: file_name,
    //             cource_id,
    //         })

    //         const newCourceVideo = new CourceVideo(datas);

    //         try {
    //             await newCourceVideo.save()
    //             const datad = { ...newCourceVideo._doc, }
    //             handleResponse(res, datad, 201)
    //         }

    //         catch (error) {
    //             res.status(400).send({ error: error.message })
    //         }
    //     }).catch(err => {
    //         return handleError(err, 400, res)
    //     })

}

exports.findAll = async (req, res) => {
    const courceVideo = await CourceVideo.find().then(data => { handleResponse(res, data, 200) }).catch(err => { handleError(err, 400, res) })
}

exports.getCourceVideio = async (req, res) => {
    const courceVideo = await CourceVideo.find({ cource_id: req.params.cource_id, })
        .then(data => {
            handleResponse(res, data, 200)
        }).catch(err => {
            handleError(err, 400, res)
        })
}