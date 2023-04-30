const mongoose = require("mongoose")
const { Schema } = mongoose

const answerSchema = Schema({
    answers: {
        type: Array,
    },
    user_id: {
        type: String,
    },
    video_id: {
        type: String,
    },
},
    {
        timestamps: true
    })


module.exports = mongoose.model("Answers", answerSchema)
