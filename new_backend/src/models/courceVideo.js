const mongoose = require("mongoose")
const { Schema } = mongoose

const courceVideochema = Schema({

    title: {
        type: String,
    },
    cource_id: {
        type: String
    },

    sort_description: {
        type: String
    },

    description: {
        type: String
    },

    imageOriginal_file_name: {
        type: String,
    },
    imageFile_name: {
        type: String,
    },
    imageType: {
        type: String,
    },
    imageFile_URL: {
        type: String,
    },
    imageFile_size: {
        type: String,
    },

    //**********Gallery*********//
    // videoOriginal_file_name: {
    //     type: String,
    // },
    // videoFile_name: {
    //     type: String,
    // },
    // videoType: {
    //     type: String,
    // },
    // videoFile_URL: {
    //     type: String,
    // },
    // videoFile_size: {
    //     type: String,
    // },

    //**********Documents*********//
    // documentOriginal_file_name: {
    //     type: String,
    // },
    // documentFile_name: {
    //     type: String,
    // },
    // documentType: {
    //     type: String,
    // },
    // documentFile_URL: {
    //     type: String,
    // },
    // documentFile_size: {
    //     type: String,
    // },



},
    {
        timestamps: true
    })


module.exports = mongoose.model("CourceVideo", courceVideochema)
