import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {createRef, useEffect, useState} from "react";
import 'katex/dist/katex.min.css';
import convertToMath from "../../utils/inlineMathRender";
import blockTypes from "../../utils/blockTypes";
import ReactQuill from "react-quill";
import "../styles/FlashcardForm.css"
import {Divider} from "@mui/material";
import {handleImage} from "../../utils/uploadImage";
import "../styles/FlashcardForm.css";


/* AddFlashCardForm
* A component that allows users to create a simple text based flashcard.
* It is a wrapper around mui's <Dialog/> component.
*
* It has the following local state:
* 1. Question
* 2. Answer
*
* It accepts the following props:
* 1. open: boolean - specifies whether dialog is open or closed
* 2. close: function - a close function that resets the 'open' boolean
* 3. addFlashCard: function - a function that passes form entries to the parent component.
*
*   */
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

export default function AddFlashCardFormQuill(props) {
    const [question, setQuestion] = useState(props.question);
    const [answer, setAnswer] = useState(props.answer);
    const [showError, setError] = useState(false);

    const onClose = () => {
        props.close();
    }

    useEffect(() => {
        setQuestion(props.question);
        setAnswer(props.answer)
    }, [props])

    const updateQuestionPreview = (value) => {
        setQuestion(value)
    }

    const updateAnswerPreview = (value) => {
        setAnswer(value)
    }

    const saveFlashCard = () => {
        if (question !== "" && answer !== "") {
            props.saveFlashCard({
                question: question,
                answer: answer
            }, blockTypes.FlashCard)
            props.close();
        } else {
            setError(true);
        }

    }

    return (
            <Dialog
                fullWidth={true}
                maxWidth="sm"
                open={props.open} >
                <DialogTitle>Add Flashcard</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Create your flash card here.
                    </DialogContentText>
                    <DialogContent role="textbox" aria-label="Question">
                        <ReactQuill
                            placeholder="Enter question..."
                            className="FlashCardQuestionEditor"
                            theme="snow"
                            value={question}
                            onChange={updateQuestionPreview}
                            modules={AddFlashCardFormQuill.modules}
                        />
                        <DialogContentText component={"div"} className="questionPreview">
                            <div>Question Preview:</div>
                            { /* I have mixed feelings about using this but this provides some reassurance:
                    https://katex.org/docs/security.html */}
                            <div dangerouslySetInnerHTML={{ __html: question }} />
                        </DialogContentText>
                    </DialogContent>


                    <Divider variant="middle"/>

                    <DialogContent role="textbox" aria-label="Answer">
                        <div className="FlashCardAnswerField">
                            <ReactQuill
                                placeholder="Enter answer.."
                                className="FlashCardAnswerEditor"
                                theme="snow"
                                value={answer}
                                onChange={updateAnswerPreview}
                                modules={AddFlashCardFormQuill.modules}
                            />
                        </div>

                        <DialogContentText component={"div"} className="answerPreview">
                            <div>Answer Preview:</div>
                            <div dangerouslySetInnerHTML={{ __html: convertToMath(answer) }} />
                        </DialogContentText>
                    </DialogContent>
                </DialogContent>

                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button onClick={saveFlashCard} aria-label="SaveFlashCard">Save</Button>
                </DialogActions>
            </Dialog>
    );
}

AddFlashCardFormQuill.modules = {
    toolbar: {
        container: [['bold', 'italic', 'underline', 'strike', 'blockquote'],
            ['image', ],
            ['clean'],
            ['formula']],
        handlers: {
            image: handleImage,
            formula: handleFormula
        }
    },
    clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
    },
}

AddFlashCardFormQuill.defaultProps = {
    open: false,
    question: '',
    answer: ''
}
