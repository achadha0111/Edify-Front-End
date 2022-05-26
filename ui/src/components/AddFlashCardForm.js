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

    const addFlashCard = () => {
        props.addFlashCard({
            question: question,
            answer: answer
        }, "FlashCard")
        props.close();
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
                    <TextField
                        autoFocus
                        fullWidth
                        margin="dense"
                        id="question"
                        label="Question"
                        type="text"
                        multiline
                        value={question}
                        variant="standard"
                        onChange={updateQuestionPreview}
                    />
                    <DialogContentText component={"div"} className="questionPreview">
                        <div>Question:</div>
                        { /* I have mixed feelings about using this but this provides some reassurance:
                    https://katex.org/docs/security.html */}
                        <div dangerouslySetInnerHTML={{ __html: convertToMath(question) }} />
                    </DialogContentText>

                    <TextField
                        fullWidth
                        margin="dense"
                        id="answer"
                        label="Answer"
                        type="text"
                        multiline
                        value={answer}
                        variant="standard"
                        onChange={updateAnswerPreview}
                    />

                    <DialogContentText component={"div"} className="answerPreview">
                        <div>Answer:</div>
                        <div dangerouslySetInnerHTML={{ __html: convertToMath(answer) }} />
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button onClick={addFlashCard}>Add</Button>
                </DialogActions>
            </Dialog>
    );
}
