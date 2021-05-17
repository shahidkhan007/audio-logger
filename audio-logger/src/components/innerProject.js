import { useParams } from "react-router"
import { get } from "axios"
import { useEffect, useState } from "react"
import { Accordion, AccordionDetails, AccordionSummary, Grid, List, ListItem, Typography } from "@material-ui/core"
import { ExpandMore } from "@material-ui/icons"
import AudioPlayer from "./AudioPlayer"
import AudioRecorder from "./AudioRecorder"


export default function InnerProject() {
    const { id } = useParams()
    const [project, setProject] = useState(null)

    const getProject = async(pid) => {
        const response = await get(`http://localhost:8000/project-by-id/${id}`)
        console.log(response)
        return response.data.project
    }

    useEffect(() => {
        setProject(getProject())
    }, [])

    return (
        project &&

        <List>
            <AudioRecorder />
            {
                [1, 2, 3].map(file => (
                    <ListItem key={file}>
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMore />}>
                                <Typography variant="h5">File {file}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Grid container>
                                    <Typography variant="body1" gutterBottom style={{margin: '15px'}}>This is project description</Typography>
                                    <AudioPlayer 
                                        style={{height: '50px', width: '100%', margin: '15px'}}
                                        
                                        />
                                </Grid>
                            </AccordionDetails>
                        </Accordion>
                    </ListItem>
                ))
            }
            
        </List>
    )
}