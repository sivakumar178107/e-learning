const { StudentAnswer } = require("../models")
const { handleResponse, handleError, getPercentage } = require("../utils/helpers")


exports.getOverAllScore = async (req, res) => {

    await StudentAnswer.find({ user_id: req.user.id, course_id: req.params.course_id }).then(async (data) => {
        const total_question = []
        const score = []
        let course_name = ''

        data.map((v) => {
            total_question.push(v.total_question)
            score.push(v.score)
            course_name = v.course_name
        })

        const percent = getPercentage(total_question, score)

        const dt = {
            percentage: parseFloat(percent), name: req.user.first_name + ' ' + req.user.last_name, course_name: course_name
        }

        handleResponse(res, dt, 200)

    }).catch(err => {
        handleError(err.message, 400, res)
    })
}