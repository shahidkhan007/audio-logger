import { useParams } from "react-router"
import { get } from "axios"
import { useEffect, useState } from "react"
import { Accordion, AccordionDetails, AccordionSummary, List, ListItem, Typography } from "@material-ui/core"
import { ExpandMore } from "@material-ui/icons"


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
            {
                [1, 2, 3].map(file => (
                    <ListItem key={file}>
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMore />}>
                                <Typography variant="h5">Project {file}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography variant="body1">This is project description</Typography>
    
                            </AccordionDetails>
                        </Accordion>
                    </ListItem>
                ))
            }
            
        </List>
    )
}