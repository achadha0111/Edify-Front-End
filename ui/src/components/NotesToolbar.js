import React from "react";
import {Box, Button, ButtonGroup, Stack, TextField, Tooltip, Typography} from "@mui/material";
import { Code, CreditCard } from '@mui/icons-material';
import SaveIcon from "@mui/icons-material/Save";
import ShortTextIcon from "@mui/icons-material/ShortText";
import SubtitlesIcon from "@mui/icons-material/Subtitles";

class Toolbar extends React.Component {

    constructor(props) {
        super(props);
        // this.toolBarAddBlock = this.toolBarAddBlock.bind(this);
        this.openFlashCardForm = this.openFlashCardForm.bind(this);
        this.addTextBlock = this.addTextBlock.bind(this);
        this.updateNoteName = this.updateNoteName.bind(this);
        this.addCodeBlock = this.addCodeBlock.bind(this);
    }

    openFlashCardForm () {
        this.props.openFlashCardForm();
    }

    addTextBlock () {
        this.props.addTextBlock({}, "RichText");
    }

    addCodeBlock () {
        this.props.addCodeBlock({}, "Code")
    }

    updateNoteName (event) {
        this.props.updateNoteName(event.target.value);
    }

    render() {
        return (
            <div className="Toolbar">
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
                    <Typography variant="h4" gutterBottom>
                        <TextField id="filled-basic" label="Title" variant="standard" value={this.props.noteName}
                                   onChange={this.updateNoteName}/>
                    </Typography>
                    <Typography variant="p" className="lastSave">
                        Last saved at: {new Date(this.props.lastSaved).toString()}
                    </Typography>
                    <Box className="ToolBar Buttons">

                        <Tooltip title="Save note">
                            <Button variant="text" className="SaveNote" onClick={this.props.saveNote}>
                                <SaveIcon/>
                            </Button>
                        </Tooltip>

                        <Tooltip title="Add text block">
                            <Button variant="text" className="InsertRichTextBlock" onClick={this.addTextBlock}>
                                <ShortTextIcon/>
                            </Button>
                        </Tooltip>

                        <Tooltip title="Insert flashcard">
                            <Button variant="text" className="InsertFlashCardBlock" onClick={this.openFlashCardForm}>
                                <SubtitlesIcon/>
                            </Button>
                        </Tooltip>

                        <Tooltip title="Insert code block">
                            <Button variant="text" className="InsertCodeBlock" onClick={this.addCodeBlock}>
                                <Code/>
                            </Button>
                        </Tooltip>

                    </Box>

                </Stack>
            </div>

        );
    }
}

Toolbar.defaultProps = {
    noteName: "Untitled"
}

export default Toolbar;