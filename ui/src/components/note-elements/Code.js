import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import {useState} from "react";
import PropTypes from "prop-types";
import {LinearProgress} from "@mui/material"
import {Button, Stack, Tooltip} from "@mui/material";
import {Delete, PlayArrow} from "@mui/icons-material";
import {runWCreateParagraph, deleteParagraph, runWOCreateParagraph} from "../../codeservice/ParagraphManager";
import Result from "./Result";
/**
 * A component to display a cell containing code **/
export default function Code(props) {

    const [userCode, setUserCode] = useState(props.data);
    const [executeIndicator, setExecuteIndicator] = useState(false);
    const [resultToDisplay, setResultToDisplay] = useState(null);

    const executeCell = () => {
        setExecuteIndicator(true);
        if (props.block.zepParaId) {
            runWOCreateParagraph(props.zepNoteId, props.block.zepParaId, userCode).then(res => {
                console.log(res)
                setResultToDisplay(res["body"]["msg"]);
                setExecuteIndicator(false);
            }).catch(err => {
                console.log(err);
            })
        } else {
            runWCreateParagraph(props.zepNoteId, userCode).then(res => {
                console.log(res);
                setResultToDisplay(res["data"]["body"]["msg"]);
                props.setCodeExecParams({
                    paraId: res.paraId,
                    execResult: res.data
                });
                setExecuteIndicator(false);
            }).catch(err => {
                console.log(err);
            })
        }

    }

    const deleteCell = (entity) => {
        props.delete(entity)
        deleteParagraph(props.zepNoteId, props.block.zepParaId).then(res => {
            setExecuteIndicator(false);
        });

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
                        extensions={[python()]}
                        onChange={(value, viewUpdate) => {
                            updateAndPropagate(value);
                        }}
                    />
                    <div aria-label="cellOptions" className="CodeCellOptions">
                        <Stack direction="column">
                            <Tooltip title="Run cell">
                                <Button variant="text" className="RunCell" onClick={executeCell}>
                                    <PlayArrow/>
                                </Button>
                            </Tooltip>
                            <Tooltip title="Delete cell">
                                <Button variant="text" className="DeleteCell" aria-label="DeleteCellButton" onClick={deleteCell}>
                                    <Delete/>
                                </Button>
                            </Tooltip>
                        </Stack>
                    </div>
                </Stack>
                <>
                    {executeIndicator ? <LinearProgress className="ExecutionStatus"/> : null}
                    {resultToDisplay ? <Result className="CodeResult" displayContent={resultToDisplay}/> : null}
                </>
            </div>


    );
}

Code.prototypes = {
    /** String containing code for the block **/
    data: PropTypes.string
}