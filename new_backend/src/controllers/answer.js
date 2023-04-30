const { Question, Answer, StudentAnswer, CourceVideo, Cource } = require("../models")
const videoCollection = require("../models/videoCollection")
const { createAnswer } = require("../utils/common")
const { handleError, handleResponse, getAnswersData } = require("../utils/helpers")

exports.create = async (req, res) => {

    const { error } = createAnswer.validate(req.body, { abortEarly: false })

    if (error) {
        return handleError(error, 400, res)
    }

    const { video_id, answers, } = req.body

    try {

        const result = await Answer.findOne({ video_id: video_id, user_id: req.user.id });

        if (result) {
            handleError('You have already answered this quize', 400, res)
            return
        } else {

            try {

                const questions = await Question.find({ video_id: video_id });

                if (!questions.length) {
                    return res.status(404).send({
                        message: 'Questions is not available!!!', error: true
                    })
                }

                try {

                    // save answer in the answers collections
                    const newAnswer = new Answer({
                        answers,
                        user_id: req.user.id,
                        video_id,
                    });
                    await newAnswer.save()

                    let rightAnswers = 0;
                    let wrongAnswers = 0;

                    questions.forEach((question) => {
                        newAnswer.answers.forEach(ans => {
                            if ((question._id).toString() === ans.question_id) {
                                if (question.currectAnswer === ans.answer) {
                                    rightAnswers = rightAnswers + 1;
                                } else {
                                    wrongAnswers = wrongAnswers + 1;
                                }
                            }
                        })
                    })

                    const vidoe = await videoCollection.findOne({ _id: video_id })
                    const content = await CourceVideo.findOne({ _id: vidoe.cource_video_Id })

                    const obj = {
                        user_id: req.user.id,
                        video_id,
                        score: rightAnswers,
                        total_question: newAnswer.answers.length,
                        course_id: content.cource_id,
                    }

                    const newStudentAnswer = new StudentAnswer(obj)
                    try {
                        newStudentAnswer.save();

                        res.status(201).send(newStudentAnswer)
                    }

                    catch (error) {
                        res.status(400).send({ error: error.message })
                    }
                } catch (error) {
                    handleError(error.message, 400, res)
                }

            } catch (err) {
                handleError(err.message, 400, res)
            }

        }


    } catch (err) {
        handleError(err.message, 400, res)
    }
}

// exports.create = async (req, res) => {

//     const { error } = createAnswer.validate(req.body, { abortEarly: false })

//     if (error) {
//         return handleError(error, 400, res)
//     }

//     const { video_id, answers, } = req.body

//     await Answer.findOne({ video_id: video_id, user_id: req.user.id }).then(async (result) => {

//         if (result) {
//             handleError('You have already answered this quize', 400, res)
//             return
//         } else {

//             await Question.find({ video_id: video_id }).then(async (questions) => {

//                 if (!questions.length) {
//                     // handleError('Questions is not available.', 404, res)
//                     // return
//                     return res.status(404).send({
//                         message: 'Questions is not available!!!', error: true
//                     })
//                 }

//                 try {

//                     // save answer in the answers collections
//                     const newAnswer = new Answer({
//                         answers,
//                         user_id: req.user.id,
//                         video_id,
//                     })
//                     await newAnswer.save()

//                     let rightAnswers = 0;
//                     let wrongAnswers = 0;

//                     questions.forEach((question) => {
//                         newAnswer.answers.forEach(ans => {
//                             if ((question._id).toString() === ans.question_id) {
//                                 if (question.currectAnswer === ans.answer) {
//                                     rightAnswers = rightAnswers + 1;
//                                 } else {
//                                     wrongAnswers = wrongAnswers + 1;
//                                 }
//                             }
//                         })
//                     })

//                     const vidoe = await videoCollection.findOne({ _id: video_id })
//                     const content = await CourceVideo.findOne({ _id: vidoe.cource_video_Id })

//                     const obj = {
//                         user_id: req.user.id,
//                         video_id,
//                         score: rightAnswers,
//                         total_question: newAnswer.answers.length,
//                         course_id: content.cource_id,
//                     }

//                     const newStudentAnswer = new StudentAnswer(obj)
//                     try {
//                         newStudentAnswer.save();

//                         res.status(201).send(newStudentAnswer)
//                     }

//                     catch (error) {
//                         res.status(400).send({ error: error.message })
//                     }
//                 } catch (error) {
//                     handleError(error.message, 400, res)
//                 }
//             })
//                 .catch(err => {
//                     handleError(err.message, 400, res)
//                 })
//         }

//     })
//         .catch(err => {
//             handleError(err.message, 400, res)
//         })
// }

exports.findAll = async (req, res) => {
    await Answer.find().then(async (data) => {
        handleResponse(res, data, 200)
    }).catch(err => {
        handleError(err.message, 400, res)
    })
}

exports.findOne = async (req, res) => {

    await Answer.findOne({ _id: req.params.id })
        .then(async (data) => {
            handleResponse(res, data, 200)
        }).catch(err => {
            handleError(err.message, 400, res)
        })
}

exports.delete = async (req, res) => {

    const answer = await Answer.findOne({ _id: req.params.id })

    if (!answer) {
        handleError('Invalid answer Id', 400, res)
    }
    await Answer.deleteOne({ _id: req.params.id }).then(async (data) => {
        handleResponse(res, 'Answer delete successfully', 200)
    }).catch(err => {
        handleError(err.message, 400, res)
    })
}

exports.update = async (req, res) => {

    const question = await Answer.findOne({ _id: req.params.id })

    const filter = { _id: req.params.id }
    const update = { option_id: req.body.option_id, }

    if (!question) {
        handleError('Invalid answer Id', 400, res)
    }

    await Answer.updateOne(filter, update, { new: true }).then(async (data) => {
        handleResponse(res, 'Question delete successfully', 200)
    }).catch(err => {
        handleError(err.message, 400, res)
    })
}



