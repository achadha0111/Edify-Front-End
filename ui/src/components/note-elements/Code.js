import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import {useState} from "react";
import PropTypes from "prop-types";
import {javascript} from "@codemirror/lang-javascript";
import {Button, Stack, Tooltip} from "@mui/material";
import {Delete, PlayArrow} from "@mui/icons-material";
import {runWCreateParagraph, runWOCreateParagraph} from "../../codeservice/ParagraphManager";
import Result from "./Result";
/**
 * A component to display a cell containing code **/
export default function Code(props) {

    const [userCode, setUserCode] = useState(props.data);
    const [resultReady, setResultReady] = useState(false);
    const [resultToDisplay, setResultToDisplay] = useState(null);

    const executeCell = async () => {
        if (props.block.zepParaId) {
            runWOCreateParagraph(props.block.zepNoteId, props.block.zepParaId, userCode).then(res => {
                setResultReady(true);
                console.log(res)
                setResultToDisplay(res["body"]["msg"]);
            }).catch(err => {
                console.log(err);
            });
        } else {
            runWCreateParagraph(props.block.zepNoteId, userCode).then(res => {
                setResultReady(true);
                console.log(res);
                setResultToDisplay(res["data"]["body"]["msg"]);
                props.setCodeExecParams({
                    paraId: res.paraId,
                    execResult: res.data
                });
            }).catch(err => {
                console.log(err);
            });
        }
    }

    const updateAndPropagate = (value) => {
        setUserCode(value);
        props.updateData(value);
    }

    return (
            <div className="CellWithOptions" onFocus={props.onFocus} tabIndex={props.tabIndex}>
                <Stack direction="row" >
                    <CodeMirror
                        className="Code"
                        value={userCode}
                        extensions={[python(), javascript()]}
                        onChange={(value, viewUpdate) => {
                            updateAndPropagate(value);
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
                {resultToDisplay ? <Result displayContent={resultToDisplay}/> : null}
            </div>
    );
}

Code.prototypes = {
    /** String containing code for the block **/
    data: PropTypes.string
}