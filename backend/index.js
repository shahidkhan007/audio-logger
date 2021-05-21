const express = require('express')
const { projectModel } = require('./models/project')
const { withMongoose } = require('./models/utils')
const multer = require('multer')
const cors = require('cors')
const fs = require('fs')
const mongoose = require('mongoose')
const Grid = require('gridfs-stream')
const mongoClient = require('mongodb').MongoClient
const Blob = require('node-blob')
const { fileModel } = require('./models/file')


const app = express()

app.use(express.json())
app.use(cors())

const upload = multer({ dest: '/temp' })


app.post('/create-file', upload.single('audio'), async(req, res) => {
    await mongoose.connect('mongodb://localhost:27017/audio-logger', { useNewUrlParser: true, useUnifiedTopology: true })

    const audioBase64 = req.body.audio
    const pid = req.body.pid

    try {
        const newFile = new fileModel({ base64Data: audioBase64, pid: pid })
        const file = await newFile.save()

        const modProject = await projectModel.findOneAndUpdate(pid, { $push: { files: [file._id] } })
        res.json({ status: 'created', file: file })
    } catch (err) {
        console.error(err)
    }

    await mongoose.connection.close()
})


app.get('/get-all-files/:pid', async(req, res) => {

    const fileIds = (await projectModel.findById(req.params.pid)).files

    base64Data = []

    let files = await fileModel.find({
        _id: { $in: fileIds.map(id => mongoose.Types.ObjectId(id)) }
    })

    res.send(files)


})


app.get('/all-projects', async(req, res) => {
    await withMongoose(async(conn) => {

        res.json({
            projects: await projectModel.find()
        })
    })

})


app.get('/project-by-id/:id', async(req, res) => {
    const id = req.params.id

    if (!id) {
        res.status(400).json({ 'status': 'not-retrieved', message: 'Invalid ID' })
        return
    }

    await withMongoose(async(conn) => {
        try {
            const targetProject = await projectModel.findById(req.params.id)
            res.json({ status: 'retrieved', project: targetProject })
        } catch (error) {
            console.log(error)
            res.status(400).json({ status: 'id-not-found', message: `No project with id: "${id}"` })
        }
    })
})

app.post('/create-project', (req, res) => {
    const body = req.body
    const { name, folderName } = body

    try {
        withMongoose(async(conn) => {
            const newProject = new projectModel({ name: name, folderName: folderName })
            const project = await newProject.save()
            res.json({ status: 'created', project: { name: project.name } })
        })

    } catch (error) {
        console.log(error)
    }


})

app.listen(8000, () => console.log('listening at port 8000'))