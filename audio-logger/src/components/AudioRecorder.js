import { Accordion, AccordionDetails, AccordionSummary, Button, Grid, ListItem, Typography } from "@material-ui/core";
import AudioReactRrecorder, { RecordState } from "audio-react-recorder"
import { useState } from "react";



export default function AudioRecorder() {
    const [recordState, setRecordState] = useState(RecordState.NONE)

    const start = () => {
        setRecordState(RecordState.START)
    }

    const stop = () => {
        setRecordState(RecordState.STOP)
    }

    const onStop = audioData => {
        console.log("Audio Data", audioData)
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