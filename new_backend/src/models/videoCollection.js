const mongoose = require("mongoose")
const { Schema } = mongoose

const videoCollectionSchema = Schema({

    title: {
        type: String,
    },
    cource_video_Id: {
        type: String
    },
    course_Id: {
        type: String
    },

    sort_description: {
        type: String
    },

    description: {
        type: String
    },

    //**********Gallery*********//
    videoOriginal_file_name: {
        type: String,
    },
    videoFile_name: {
        type: String,
    },
    videoType: {
        type: String,
    },
    videoFile_URL: {
        type: String,
    },
    videoFile_size: {
        type: String,
    },

    //****************Document**********************//
    documentOriginal_file_name: {
        type: String,
    },
    documentFile_name: {
        type: String,
    },
    documentType: {
        type: String,
    },
    documentFile_URL: {
        type: String,
    },
    documentFile_size: {
        type: String,
    },
},
    {
        timestamps: true
    })


module.exports = mongoose.model("VideoCollections", videoCollectionSchema)
