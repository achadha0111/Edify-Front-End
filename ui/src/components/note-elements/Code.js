import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import {useState} from "react";
import PropTypes from "prop-types";
import {javascript} from "@codemirror/lang-javascript";
import {Button, Stack, Tooltip} from "@mui/material";
import {Delete, PlayArrow} from "@mui/icons-material";
import {runParagraph} from "../../codeservice/ParagraphManager";

/**
 * A component to display a cell containing code **/
export default function Code(props) {

    const [userCode, setUserCode] = useState(props.data);
    const [resultReady, setResultReady] = useState(false);
    const [resultToDisplay, setResultToDisplay] = useState("");


    const executeCell = async () => {
        const result = await runParagraph('some id', props.data);
        setResultReady(true);
        setResultToDisplay(result["body"]["msg"]);
    }

    return (
        <>
            <div className="CellWithOptions" onFocus={props.onFocus} tabIndex={props.tabIndex}>
                <Stack direction="row" >
                    <CodeMirror
                        className="Code"
                        value={userCode}
                        extensions={[python(), javascript()]}
                        onChange={(value, viewUpdate) => {
                            setUserCode(value);
                        }}
                    />
                    <div aria-label="cellOptions" className="CodeCellOptions">
                        <Stack direction="column">
                            <Tooltip title="Delete cell">
                                <Button variant="text" className="DeleteCell" aria-label="DeleteCellButton" onClick={props.delete}>
                                    <Delete/>
                                </Button>
                            </Tooltip>
                            <Tooltip title="Run cell">
                                <Button variant="text" className="RunCell" onClick={executeCell}>
                                    <PlayArrow/>
                                </Button>
                            </Tooltip>
                        </Stack>
                    </div>
                </Stack>
            </div>
            {resultReady ? <div> {resultToDisplay} </div> : null}
        </>
    );
}

Code.prototypes = {
    /** String containing code for the block **/
    data: PropTypes.string
}