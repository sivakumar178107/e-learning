const mongoose = require("mongoose")
const { Schema } = mongoose

const questionSchema = Schema({
    question: {
        type: String,
    },
    user_id: {
        type: String,
    },
    video_id: {
        type: String,
    },
    option1: {
        type: String,
    },
    option2: {
        type: String,
    },
    option3: {
        type: String,
    },
    option4: {
        type: String,
    },
    currectAnswer: {
        type: String
    },
},
    {
        timestamps: true
    })


module.exports = mongoose.model("Questions", questionSchema)
