import { useParams } from "react-router"
import { get } from "axios"
import { useEffect, useState } from "react"
import { Accordion, AccordionDetails, AccordionSummary, Grid, List, ListItem, Typography } from "@material-ui/core"
import { ExpandMore } from "@material-ui/icons"
import AudioPlayer from "./AudioPlayer"
import AudioRecorder from "./AudioRecorder"


const b64toBlob = (b64Data, contentType='', sliceSize=512) => {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, {type: contentType});
  return blob;
}

export default function InnerProject() {
    const { id } = useParams()
    const [project, setProject] = useState(null)
    const [files, setFiles] = useState([])

    const getProject = async(pid) => {
        const response = await get(`http://localhost:8000/project-by-id/${pid}`)
        console.log(response)
        setProject(response.data.project)
    }

    const getProjectFiles = async(pid) => {
        const response = await get(`http://localhost:8000/get-all-files/${pid}`)
        console.log(response)
        let files = response.data.map(f => f.base64Data)
        let contentType = null
        const fids = response.data.map(f => f._id)

        files = files.map(b64 => {
            b64 = b64.slice(5)
            let [ct, data] = b64.split(';')
            contentType = ct
            data = data.slice(7)
            return data
        })

        const blobs = files.map(f => b64toBlob(f, contentType))
        const blobURLS = blobs.map(blob => URL.createObjectURL(blob))
        const zipped = blobURLS.map((url, i) => ([url, fids[i]]))
        setFiles(zipped)
    }

    useEffect(() => {
        getProject(id)
        getProjectFiles(id)
    }, [])

    return (
        project !== null &&
        files &&
        <List>
            <AudioRecorder pid={id}/>
            {
                files.map(file => (
                    <ListItem key={file[1]}>
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMore />}>
                                <Typography variant="h5">File {file[1]}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Grid container>
                                    <Typography variant="body1" gutterBottom style={{margin: '15px'}}>This is project description</Typography>
                                    <AudioPlayer 
                                        style={{height: '50px', width: '100%', margin: '15px'}}
                                        src={file[0]}
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