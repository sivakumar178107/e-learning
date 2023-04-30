const { default: mongoose } = require('mongoose')
mongoose.set('strictQuery', true);

mongoose.connect(`${process.env.URI}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

}).then(() => {
    console.log('Db connection done')
}).catch(error => {
    console.log('Error>>>>>>', error);
})



const db = {
    User: require('./user'),
    Cource: require('./cource'),
    CourceVideo: require('./courceVideo'),
    VideoCollection: require('./videoCollection'),

    Comment: require('./comment'),
    Reply: require('./reply'),


    Question: require('./question'),
    Answer: require('./answer'),
    Option: require('./option'),
    StudentAnswer: require('./studentAnswer'),
    HelpDesk: require('./helpDesk'),
    Annotation: require('./annotation')
}





module.exports = db