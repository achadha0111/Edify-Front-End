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
    }

    openFlashCardForm () {
        this.props.openFlashCardForm();
    }

    addTextBlock () {
        this.props.addTextBlock({}, "RichText");
    }

    render() {
        return (
            <div className="Toolbar">
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
                    <Typography variant="h4" gutterBottom>
                        {/* TODO This must be editable*/}
                        <TextField id="filled-basic" label="Untitled" variant="standard" />
                    </Typography>

                    <Box className="ToolBar Buttons">

                        <Tooltip title="Save note">
                            <Button variant="text" className="SaveNote">
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
                            <Button variant="text" className="InsertCodeBlock">
                                <Code/>
                            </Button>
                        </Tooltip>

                    </Box>



                </Stack>
            </div>

        );
    }
}

export default Toolbar;