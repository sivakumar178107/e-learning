const auths = require('./auth')
const users = require('./user')

const cources = require('./cource')
const courceVideos = require('./courceVideo')

const videoCollections = require('./videoCollection')

const comments = require('./comment')
const replies = require('./reply')

const questions = require('./question')

const answers = require('./answer')
const options = require('./option')

const studentAnswers = require('./studentAnswer')
const helpDesks = require('./helpDesk')

const annotations = require('./annotation')

module.exports = {
    auths,
    users,

    cources,
    courceVideos,
    videoCollections,

    comments,
    replies,

    questions,
    answers,
    options,
    studentAnswers,
    helpDesks,

    annotations,
}