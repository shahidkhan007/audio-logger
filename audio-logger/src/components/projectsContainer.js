import { Button, Card, CardActions, CardContent, Grid, Typography } from "@material-ui/core";
import {get} from "axios"
import {useEffect, useState} from "react"

export default function ProjectsContainer() {
    const [projects, setProjects] = useState()

    const getProjects = async() => {
        const response = await get('http://localhost:8000/all-projects')
        setProjects(response.data.projects)
    }

    const goToProject = () => {
        console.log("Going to project")
    }

    useEffect(() => {
        getProjects()
    }, [])

    return (
        <>
        {
        projects &&
        <Grid container className='container' spacing={3}>
            {
                projects.map(project => (
                    <Grid item className='project-item-grid' key={project.name} xs={4}>
                        <Card className='card-item'>
                            <CardContent>
                                <Typography className="title" variant="h2" gutterBottom>
                                    {project.name}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" onClick={goToProject}>Go To Project</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))
            }

        </Grid>}
        </>
        
    )
}