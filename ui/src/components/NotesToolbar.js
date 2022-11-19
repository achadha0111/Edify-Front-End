import React, {useEffect, useState} from "react";
import {AppBar, Box, Button, Stack, TextField, Tooltip, Typography} from "@mui/material";
import {Code} from '@mui/icons-material';
import SaveIcon from "@mui/icons-material/Save";
import ShortTextIcon from "@mui/icons-material/ShortText";
import SubtitlesIcon from "@mui/icons-material/Subtitles";
import blockTypes from "../utils/blockTypes";
import {fDateTime} from "../utils/formatTime";
import {styled} from "@mui/material/styles";

const TitleInput = ({value, onChange}) => {
    return (<Typography variant="h4" gutterBottom>
        <TextField key="noteTitle" id="filled-basic" aria-label="Title" variant="standard" value={value}
               onChange={onChange}/>
    </Typography>)
}

const NoteBar = styled(AppBar)(({ theme }) => ({
    boxShadow: 'none',
    backdropFilter: 'blur(6px)',
    WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
    margin: "none",
    backgroundColor: "#fff",
    [theme.breakpoints.up('lg')]: {
        width: `calc(100% - ${220 + 1}px)`,
    },
}));

function Toolbar(props) {
    const [noteName, setNoteName] = useState(props.noteName);

    useEffect(() => {
        setNoteName(props.noteName);
    }, [props.noteName]);

    function openFlashCardForm() {
        props.openFlashCardForm();
    }

    function addTextBlock() {
        props.addTextBlock("", blockTypes.RichText);
    }

    function addCodeBlock() {
        props.addCodeBlock("", blockTypes.Code)
    }

    function updateNoteName (event) {
        setNoteName(event.target.value);
        props.updateNoteName(event.target.value);
    }

    return (
        <NoteBar className="Toolbar">
                <Stack direction="row" alignItems="center" justifyContent="space-evenly">

                    <TitleInput value={noteName} onChange={updateNoteName}/>
                    <Typography className="kernelStatus" variant="p"> Kernel Status: {props.kernelStatus} </Typography>

                    <Typography variant="p" className="lastSave" aria-label="LastSavedDateTime">
                        Last saved on: {props.lastSaved === "" ? "Not Saved" : fDateTime(props.lastSaved)}
                    </Typography>
                    <Box className="ToolBar Buttons">

                        <Tooltip title="Save note">
                            <Button variant="text" className="SaveNote" onClick={props.saveNote}>
                                <SaveIcon/>
                            </Button>
                        </Tooltip>

                        <Tooltip title="Insert text block">
                            <Button variant="text" className="InsertRichTextBlock" onClick={addTextBlock}>
                                <ShortTextIcon/>
                            </Button>
                        </Tooltip>

                        <Tooltip title="Insert flashcard">
                            <Button variant="text" className="InsertFlashCardBlock" onClick={openFlashCardForm}>
                                <SubtitlesIcon/>
                            </Button>
                        </Tooltip>

                        <Tooltip title="Insert code block">
                            <Button variant="text" className="InsertCodeBlock" onClick={addCodeBlock}>
                                <Code/>
                            </Button>
                        </Tooltip>



                    </Box>

                </Stack>
        </NoteBar>


    );

}

Toolbar.defaultProps = {
    noteName: "Untitled",
    lastSaved: ""
}

export default Toolbar;