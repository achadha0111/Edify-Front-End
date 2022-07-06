import React, {useEffect, useState} from "react";
import {Box, Button, ButtonGroup, Stack, TextField, Tooltip, Typography} from "@mui/material";
import {Code, ContentCut, CreditCard} from '@mui/icons-material';
import SaveIcon from "@mui/icons-material/Save";
import ShortTextIcon from "@mui/icons-material/ShortText";
import SubtitlesIcon from "@mui/icons-material/Subtitles";
import blockTypes from "../utils/blockTypes";
import {fDateTime} from "../utils/formatTime";

function Toolbar(props) {
    const [noteName, setNoteName] = useState(props.noteName);

    useEffect(() => {
        setNoteName(props.noteName);
    });

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
        <div className="Toolbar">
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
                <Typography variant="h4" gutterBottom>
                    <TextField id="filled-basic" label="Title" variant="standard" value={noteName}
                               onChange={updateNoteName}/>
                </Typography>
                <Typography variant="p" className="lastSave">
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
        </div>

    );

}

Toolbar.defaultProps = {
    noteName: "Untitled",
    lastSaved: ""
}

export default Toolbar;