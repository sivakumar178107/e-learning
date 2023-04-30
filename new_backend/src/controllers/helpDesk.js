const { HelpDesk, User } = require("../models");
const { handleResponse, handleError, helpDeskMailer } = require("../utils/helpers");

exports.create = async (req, res) => {
    const { name, message, email } = req.body

    const msg = {
        name, message, email, user_id: req.user.id
    }

    const newHelpdesk = new HelpDesk(msg)
    try {
        await newHelpdesk.save()

        const data = { ...newHelpdesk._doc, }

        const subject = 'Assistance Request:'

        helpDeskMailer(email, name, subject, message,)
        handleResponse(res, data, 201)

    } catch (error) {
        handleError(error.message, 400, res)
    }
}

exports.findAll = async (req, res) => {

    const user = await User.findOne({ _id: req.user.id })
    if (user.role === 'faculty') {

        await HelpDesk.find().then(data => {
            handleResponse(res, data, 200)
        }).catch(err => {
            handleError(err.message, 400, res)
        })

    } else {
        handleError('Only faculty members have access to these endpoints.', 400, res)
        return
    }
}