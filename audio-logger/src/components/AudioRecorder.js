import { Accordion, AccordionDetails, AccordionSummary, Button, Grid, ListItem, Typography } from "@material-ui/core";
import AudioReactRrecorder, { RecordState } from "audio-react-recorder"
import { useState } from "react";
import { post } from "axios"



export default function AudioRecorder({pid}) {
    const [recordState, setRecordState] = useState(RecordState.NONE)

    const start = () => {
        setRecordState(RecordState.START)
    }

    const stop = () => {
        setRecordState(RecordState.STOP)
    }

    const onStop = async(audioData) => {
        console.log(audioData)
        const audio = audioData.blob
        const reader = new FileReader()
        reader.readAsDataURL(audio)
        reader.onloadend = () => {
            const data = reader.result
            const form = new FormData()
            form.append('pid', pid)
            form.append('audio', data)
            post("http://localhost:8000/create-file", form, {
                headers: {'Content-Type': 'multipart/form-data'}
            }).then(response => {
                console.log(response)
            })
        }
 

    }

    return (
        <ListItem>
            <Accordion>
                <AccordionSummary>
                    <Typography variant="h5">Add File</Typography>
                </AccordionSummary>

                <AccordionDetails>
                    <Grid container>
                        <Grid item>
                        <AudioReactRrecorder
                        state={recordState}
                        onStop={onStop}
                        canvasHeight="50px"
                        backgroundColor="#f5abc9"
                        foregroundColor="#21094e"
                        />

                        </Grid>
                        <Grid item>
                            <Button
                            color="secondary"
                            onClick={start}
                            className="control-button"
                            style={{
                                marginTop: "5px"
                            }}
                            >Start</Button>
                        </Grid>
                        
                        <Grid item>
                            <Button
                            color="secondary"
                            onClick={stop}
                            className="control-button"
                            style={{
                                marginTop: "5px"
                            }}
                            >Stop</Button>
                        </Grid>
                        
                    </Grid>
                    
                </AccordionDetails>
            </Accordion>
        </ListItem>
        
    )
}