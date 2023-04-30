const mongoose = require("mongoose")
const { Schema } = mongoose

const annotationSchema = Schema({
    targetId: { type: String, },
    Id: { type: String, unique: true },
    Subject: { type: String, },
    loginId: { type: String, },
    ToolName: { type: String, },
    Contents: { type: String, },
    PageNumber: { type: Number },
    X: { type: Number },
    Y: { type: Number },
    Quads: [{ type: Object }], // array of point if it is a highligh
    Auther: { type: String, },
    Color: Object,
    InReplyTo: { type: String, } // parent id if it is a reply
}, {
    timestamps: true
})


module.exports = mongoose.model("Annotations", annotationSchema)
