import React, {useEffect, useState} from "react";
import ReactQuill, {Quill} from 'react-quill';
import '../styles/EditorStyles.css';
import 'katex/dist/katex.min.css';
import katex from 'katex';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import {Button, TextField} from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import {handleImage} from "../../utils/uploadImage";


window.katex = katex;

function handleFormula() {
    let tooltip = this.quill.theme.tooltip;
    let range = this.quill.getSelection();
    let preview = this.quill.getContents(range.index, range.length);
    if (preview["ops"].length !== 0) {
        tooltip.edit('formula', preview["ops"][0]["insert"]["formula"]);
        this.quill.deleteText(range.index, range.length);
    } else {
        tooltip.edit('formula', "");
    }

}

function EquationEditor(props) {
    const [equation, setEquation] = useState(props.data);
    const [equationUpdate, setEquationUpdate] = useState(false);

    useEffect(() => {
        if (props.data !== equation && !equationUpdate) {
            setEquation(props.data);
        }
    }, [props])

    function handleClose() {
        props.close(false);
    }

    function updateEquation(event) {
       const updatedValue = event.target.value
       setEquation(updatedValue);
       setEquationUpdate(true);
    }

    function saveEquation() {
        props.saveEquation(equation);
        props.close(false);
        setEquationUpdate(false);
    }

    return (
        <div>
            <Dialog open={props.open} onClose={handleClose}>
                <DialogTitle>Edit Equation</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        multiline
                        minRows={3}
                        margin="dense"
                        id="equation-editor"
                        label="Equation"
                        fullWidth
                        variant="standard"
                        value={equation}
                        onChange={updateEquation}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={saveEquation}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default function RichText(props) {
    const [value, setValue] = useState(props.data);
    const [equationEditorOpen, setEquationEditorOpen] = useState(false);
    const [equationToEdit, setEquationToEdit] = useState("");
    const [range, setRange] = useState({});

    useEffect(() => {
        props.innerRef.current.focus()
    }, []);

    function updateAndPropagateValue(value) {
        setValue(value);
        props.updateData(value);
    }

    function handleSelectionChange(range, source, editor) {
        if (range) {
            let preview = editor.getContents(range.index, range.length);
            if (preview["ops"].length !== 0 && preview["ops"][0]["insert"]["formula"]) {
                let editEquation = preview["ops"][0]["insert"]["formula"];
                setEquationToEdit(editEquation);
                setEquationEditorOpen(true);
                setRange(range);
            }
        }
    }

    function saveEquation(equation) {
        let quillRef = props.innerRef.current.getEditor();
        quillRef.editor.deleteText(range.index, range.length);
        quillRef.editor.insertEmbed(range.index, 'formula', equation);
    }

    return (
        <>
            <ReactQuill
                className="RichTextEditor"
                theme="snow"
                value={value}
                onChange={updateAndPropagateValue}
                modules={RichText.modules}
                onFocus={props.onFocus}
                ref={props.innerRef}
                onChangeSelection={handleSelectionChange}
            />
            <EquationEditor data={equationToEdit}
                            open={equationEditorOpen}
                            close={()=> setEquationEditorOpen(false)}
            saveEquation={saveEquation}/>
        </>
        )
    }

RichText.modules = {
    toolbar: {
        container: [[{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
        [{size: []}],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'},
            {'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image', 'video'],
        ['clean'],
        ['formula']],
        handlers: {
            formula: handleFormula,
            image: handleImage,
        }
    },
    clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
    },
}

RichText.defaultProps = {
    data: ''
}

