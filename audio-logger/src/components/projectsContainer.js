import { Grid, Icon, SvgIcon } from "@material-ui/core";
import {get} from "axios"
import {useEffect, useState} from "react"
import Project from "./project";

export default function ProjectsContainer() {
    const [projects, setProjects] = useState()
    

    const getProjects = async() => {
        const response = await get('http://localhost:8000/all-projects')
        setProjects(response.data.projects)
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
                    <Project project={project} key={project._id}/>
                ))
            }

        </Grid>
        }
        </>
        
    )
}