const mongoose = require('mongoose')

const fileSchema = new mongoose.Schema({
    base64Data: { type: String, required: true },
    pid: { type: String, required: true }
})

const fileModel = mongoose.model('File', fileSchema)



module.exports = { fileSchema, fileModel };