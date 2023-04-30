const mongoose = require("mongoose")
const { Schema } = mongoose

const courceSchema = Schema({

    name: {
        type: String,
    },
    instructor: {
        type: String,
    },
    language: {
        type: String,
    },
    description: {
        type: String,
    },
    about_cource: {
        type: String,
    },

    original_file_name: {
        type: String,
    },
    file_name: {
        type: String,
    },
    type: {
        type: String,
    },
    file_URL: {
        type: String,
    },
    faculty_id:{
        type: String,
    },
    file_size: {
        type: String,
    },

    date: {
        type: String,
    },
    status: {
        type: String,
    },
},
    {
        timestamps: true
    })


module.exports = mongoose.model("Cource", courceSchema)
