const mongoose = require("mongoose")
const { Schema } = mongoose

const optionSchema = Schema({
    option: {
        type: String,
    },
    isCorrect: {
        type: Boolean,
        default: false
    },
    question_id: {
        type: String,
    },
    video_id: {
        type: String,
    },
},
    {
        timestamps: true
    })


module.exports = mongoose.model("Options", optionSchema)
