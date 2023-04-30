const mongoose = require("mongoose")
const { Schema } = mongoose

const helpDesk = Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    question: {
        type: String,
    },
    user_id: {
        type: String,
    },
},
    {
        timestamps: true
    })


module.exports = mongoose.model("HelpDesks", helpDesk)
