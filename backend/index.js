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