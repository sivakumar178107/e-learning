const { Question, Option } = require("../models")
const { createOption } = require("../utils/common")
const { handleError, handleResponse } = require("../utils/helpers")

exports.create = async (req, res) => {
    const { error } = createOption.validate(req.body, { abortEarly: false })

    if (error) {
        return handleError(error, 400, res)
    }

    const { question_id, video_id, option, isCorrect, } = req.body

    await Question.findOne({ _id: question_id }).then(async (data) => {

        if (data === null) {
            handleError('Invalid question ID', 400, res)
        }

        let datas = ({
            option,
            isCorrect,

            question_id,
            video_id,
        })

        const newOption = new Option(datas)
        try {

            await newOption.save()
            const datad = { ...newOption._doc, }
            handleResponse(res, datad, 201)
        }

        catch (error) {
            res.status(400).send({ error: error.message })
        }
    })
        .catch(err => {
            handleError('Invalid question ID', 400, res)
        })
}

exports.findAll = async (req, res) => {
    await Option.find().then(async (data) => {
        handleResponse(res, data, 200)
    }).catch(err => {
        handleError(err.message, 400, res)
    })
}