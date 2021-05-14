const mongoose = require('mongoose')


async function withMongoose(callback) {
    const connection = mongoose.connect('mongodb://localhost:27017/audio-logger', { useNewUrlParser: true, useUnifiedTopology: true })
    const response = await callback(connection)
    mongoose.connection.close()
    return response
}



module.exports = { withMongoose }