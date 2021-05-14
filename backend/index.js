const express = require('express')
const { projectModel } = require('./models/project')
const { withMongoose } = require('./models/utils')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())


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