const { Annotation } = require("../models");
const { handleResponse } = require("../utils/helpers");


exports.create = async (req, res) => {
    try {
        const { action, targetId } = req.query
        let anot = null
        if (action === "add") {


            anot = await Annotation.insertMany(req.body)
        } else if (action === "delete") {
            anot = await Annotation.deleteMany({ $or: [{ Id: { $in: req.body.map(doc => doc.Id) }, targetId: targetId }, { InReplyTo: { $in: req.body.map(doc => doc.Id) }, targetId: targetId }] })
        }
        else if (action === "modify") {
            for (let i = 0; i < req.body.length; i++) {
                const element = req.body[i];
                await Annotation.updateOne(
                    { targetId: targetId, Id: element.Id },
                    {
                        Contents: element.Contents,
                        PageNumber: element.PageNumber,
                        X: element.X,
                        Y: element.Y,
                        Quads: element.Quads, // array of point if it is a highligh
                        Color: element.Color,
                    }
                );
            }
            anot = { acknowledged: true, updatedCount: req.body.length }
        }

        handleResponse(res, anot, 201);
        return
    }
    catch (error) {
        console.log(error);
        res.status(400).send({ error: error.message })
    }
}

exports.get = async (req, res) => {
    try {
        const anots = await Annotation.find({ targetId: req.query.targetId })
        handleResponse(res, anots, 200);
    } catch (error) {
        console.log("error get annatations:", error);
        res.status(400).send({ error: error.message })
    }
}