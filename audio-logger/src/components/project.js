import {useState} from "react"
import {
    Card, 
    Grid, 
    CardContent, 
    Typography, 
    CardActions, 
    Button,
} from "@material-ui/core"

import { Link } from "react-router-dom"


export default function Project({project}) {
    const [bg, setBg] = useState("#4ca1a3")
    const [elevation, setElevation] = useState(2)

    const goToProject = () => {
        console.log("Going to project")

    }

    const handleHover = (e) => {
        setBg("#511281")
        setElevation(12)
    }

    const handleHoverEnd = (e) => {
        setBg("#4ca1a3")
        setElevation(2)
    }


    return (
        <Grid item className='project-item-grid' key={project.name} xs={4}>
            <Card
            className='card-item'
            style={{backgroundColor: bg}} 
            elevation={elevation}
            onMouseOver={handleHover}
            onMouseOut={handleHoverEnd}
            >
                <CardContent>
                    <Typography className="title" variant="h2" gutterBottom style={{textAlign: 'center'}}>
                        {project.name}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Grid container justify='center'>
                        <Link to={`/project/${project._id}`} style={{textDecoration: "none"}}>
                            <Button size="small" onClick={goToProject}>Go To Project</Button>
                        </Link>
                        
                    </Grid>
                    
                </CardActions>
            </Card>
        </Grid>
    )
}