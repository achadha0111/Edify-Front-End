import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useEffect, useState} from "react";
import 'katex/dist/katex.min.css';
import convertToMath from "../../utils/inlineMathRender";

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
export default function AddFlashCardForm(props) {
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

    const updateQuestionPreview = (event) => {
        setQuestion(event.target.value)
    }

    const updateAnswerPreview = (event) => {
        setAnswer(event.target.value)
    }

    const saveFlashCard = () => {
        if (question !== "" && answer !== "") {
            props.saveFlashCard({
                question: question,
                answer: answer
            }, "FlashCard")
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
                    <TextField
                        error={showError}
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
                        aria-label="QuestionInput"
                    />
                    <DialogContentText component={"div"} className="questionPreview">
                        <div>Question:</div>
                        { /* I have mixed feelings about using this but this provides some reassurance:
                    https://katex.org/docs/security.html */}
                        <div dangerouslySetInnerHTML={{ __html: convertToMath(question) }} />
                    </DialogContentText>

                    <TextField
                        error={showError}
                        fullWidth
                        margin="dense"
                        id="answer"
                        label="Answer"
                        type="text"
                        multiline
                        value={answer}
                        variant="standard"
                        onChange={updateAnswerPreview}
                        aria-label="AnswerInput"
                    />

                    <DialogContentText component={"div"} className="answerPreview">
                        <div>Answer:</div>
                        <div dangerouslySetInnerHTML={{ __html: convertToMath(answer) }} />
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button onClick={saveFlashCard} aria-label="SaveFlashCard">Save</Button>
                </DialogActions>
            </Dialog>
    );
}

AddFlashCardForm.defaultProps = {
    open: false,
    question: '',
    answer: ''
}
