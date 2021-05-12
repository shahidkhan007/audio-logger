const mongoose = require('mongoose')


async function withMongoose(callback) {
    const connection = mongoose.connect('mongodb://localhost:27017/audio-logger', { useNewUrlParser: true, useUnifiedTopology: true })
    await callback(connection)
    mongoose.connection.close()
}



module.exports = { withMongoose }