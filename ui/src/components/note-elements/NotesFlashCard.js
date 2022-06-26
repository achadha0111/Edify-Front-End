import React from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Collapse, IconButton} from "@mui/material";
import { styled } from '@mui/material/styles';
import convertToMath from "../../utils/inlineMathRender";

export default function NotesFlashCard(props) {
    const question = props.data.question;
    const answer = props.data.answer;

    const [showAnswer, setShowAnswer] = React.useState(false);

    const editFlashCard = () => {
        props.openFlashCardForm({
            question: question,
            answer: answer,
            cardKey: props.index
        })
    }

    const deleteCard = () => {
        props.deleteCard({cardIndex: props.index})
    }

    const displayAnswer = () => {
        setShowAnswer(!showAnswer);
    }

    return (
        <Card className = "FlashCard" sx={{ minWidth: 400, minHeight: 290}} role="flashcard" aria-label="flashcard">
            <CardContent sx={{minHeight: 110}}>
                <Typography div color="text.primary">
                    <div dangerouslySetInnerHTML={{ __html: convertToMath(question) }} />
                </Typography>
            </CardContent>
            <CardContent sx={{minHeight: 110}}>
                <Typography div>
                    {showAnswer ? <div dangerouslySetInnerHTML={{ __html: convertToMath(answer) }} /> : null}
                </Typography>
            </CardContent>
            <CardActions>
                <Button aria-label="ShowAnswer" size="small" onClick={displayAnswer}>
                    {showAnswer ? 'Hide Answer' : 'Show Answer'}
                </Button>
                <Button size="small" aria-label="EditFlashCard" onClick={editFlashCard}>Edit</Button>
                <Button size="small" aria-label="DeleteFlashCard" onClick={deleteCard}>Delete</Button>
            </CardActions>
        </Card>
    );
}