import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useState} from "react";
import 'katex/dist/katex.min.css';
import convertToMath from "../utils/inlineMathRender";

export default function AddFlashCardForm(props) {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");

    const onClose = () => {
        props.close();
    }

    const updateQuestionPreview = (event) => {
        setQuestion(event.target.value)
    }

    const updateAnswerPreview = (event) => {
        setAnswer(event.target.value)
    }

    return (
        <div>
            <Dialog
                fullWidth={true}
                maxWidth="md"
                open={props.open} >
                <DialogTitle>Add Flashcard</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Create your flash card here.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="question"
                        label="Question"
                        type="text"
                        fullWidth
                        value={question}
                        variant="standard"
                        onChange={updateQuestionPreview}
                    />
                    <DialogContentText className="questionPreview">
                        Preview:
                        { /* I have mixed feelings about using this but this provides some reassurance:
                    https://katex.org/docs/security.html */}
                        <>
                            <div dangerouslySetInnerHTML={{ __html: convertToMath(question) }} />
                            {/*{convertToMath(question)}*/}
                        </>
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="answer"
                        label="Answer"
                        type="text"
                        fullWidth
                        value={answer}
                        variant="standard"
                        onChange={updateAnswerPreview}
                    />
                    <DialogContentText className="answerPreview">
                        Answer:
                        <div dangerouslySetInnerHTML={{ __html: convertToMath(answer) }} />
                        {/*{convertToMath(question)}*/}
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    {/*<Button onClick={addFlashCard}>Add</Button>*/}
                </DialogActions>
            </Dialog>
        </div>
    );
}
