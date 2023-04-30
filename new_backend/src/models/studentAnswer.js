const mongoose = require("mongoose")
const { Schema } = mongoose

const studentAnswer = Schema({

    total_question: {
        type: Number,
    },
    score: {
        type: Number,
    },
    course_id: {
        type: String,
    },
    course_name: {
        type: String,
    },
    video_id: {
        type: String,
    },
    user_id: {
        type: String,
    },
    user_name: {
        type: String,
    },
},
    {
        timestamps: true
    })


module.exports = mongoose.model("StudentAnswers", studentAnswer)
