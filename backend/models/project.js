const fs = require('fs')
const mongoose = require('mongoose')




const projectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    files: [Object]
})

const projectModel = mongoose.model('Project', projectSchema)



module.exports = { projectSchema, projectModel };