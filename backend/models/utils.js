const mongoose = require('mongoose')


async function withMongoose(callback) {
    const connection = await mongoose.connect('mongodb://localhost:27017/audio-logger', { useNewUrlParser: true, useUnifiedTopology: true })
    const response = await callback(connection)
    return response
}



module.exports = { withMongoose }