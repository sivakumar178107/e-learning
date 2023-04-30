const { User, Question, StudentAnswer } = require("../models")
const { createQuestion } = require("../utils/common")
const { handleError, handleResponse, } = require("../utils/helpers")

exports.create = async (req, res) => {
    const { error } = createQuestion.validate(req.body, { abortEarly: false })

    if (error) {
        return handleError(error, 400, res)
    }

    await User.findOne({ _id: req.user.id }).then(async (user) => {

        if (user.role === 'faculty') {
            const { question, video_id, option1, option2, option3, option4, currectAnswer } = req.body

            let data = ({
                question,
                user_id: req.user.id,
                video_id,
                option1,
                option2,
                option3,
                option4,
                currectAnswer,
            })

            const newQuestion = new Question(data)
            try {
                await newQuestion.save()
                const datad = { ...newQuestion._doc, }
                handleResponse(res, datad, 201)
            }

            catch (error) {
                res.status(400).send({ error: error.message })
            }
        } else {
            handleError('Question must be add only faculty', 400, res)
        }

    })
        .catch(err => {
            handleError(err.message, 400, res)
        })

}

exports.findAll = async (req, res) => {
    await Question.find().then(async (data) => {
        handleResponse(res, data, 200)
    }).catch(err => {
        handleError(err.message, 400, res)
    })
}

exports.findOne = async (req, res) => {
    await Question.findOne({ _id: req.params.id })
        .then(async (data) => {
            if (data === null) { handleError('No record found', 400, res) }
            else {

                handleResponse(res, data, 200)
            }
        }).catch(err => {
            handleError('Invalid question id', 400, res)
        })
}

exports.getQuestionByVideoId = async (req, res) => {
    const stdAns = await StudentAnswer.findOne({ video_id: req.params.id, user_id: req.user.id })
    if (stdAns) {
        handleResponse(res, 'You have already answer this quize', 409)
        return
    }
    await Question.find({ video_id: req.params.id })
        .then(data => {
            handleResponse(res, data, 200)
        }).catch(err => {
            handleError(err.message, 400, res)
        })
}

exports.update = async (req, res) => {

    const question = await Question.findOne({ _id: req.params.id })
        .then(async (result) => {
            const filter = { _id: req.params.id }
            const update = req.body
            if (result === null) { handleError('Invalid question Id', 400, res) }

            await Question.updateOne(filter, update, { new: true }).then(async (data) => {

                handleResponse(res, 'Question updated successfully', 200)

            }).catch(err => {
                handleError(err.message, 400, res)
            })

        }).catch(err => {
            handleError('Invalid question Id', 400, res)
        })
}

exports.delete = async (req, res) => {
    await Question.findOne({ _id: req.params.id })
        .then(async (result) => {
            if (result === null) { handleError('Invalid question Id', 400, res) }
            await Question.deleteOne({ _id: req.params.id }).then(async (data) => {
                handleResponse(res, 'Question delete successfully', 200)
            }).catch(err => {
                handleError(err.message, 400, res)
            })
        }).catch(err => {
            handleError('Invalid question Id', 400, res)

        })
}