import React from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Chip, Stack} from "@mui/material";
import { styled } from '@mui/material/styles';
import "../styles/Blocks.css";
import {Link as RouterLink} from "react-router-dom";

// const ExpandMore = styled((props) => {
//     const { expand, ...other } = props;
//     return <IconButton {...other} />;
// })(({ theme, expand }) => ({
//     marginLeft: 'auto',
//     transition: theme.transitions.create('transform', {
//         duration: theme.transitions.duration.shortest,
//     }),
// }));
//
// function ExpandMoreIcon() {
//     return null;
// }

const TitleStyle = styled(RouterLink)({
    height: 44,
    overflow: 'hidden',
    WebkitLineClamp: 2,
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    textDecoration: "none",
});

export default function ReviewFlashCard(props) {
    const question = props.question;
    const answer = props.answer;

    const [showAnswer, setShowAnswer] = React.useState(false);

    const displayAnswer = () => {
        setShowAnswer(!showAnswer);
    }

    const sendResponse = (event) => {
        props.cardInteraction({
            cardRemembered: event.target.value === 'Remembered',
            id: props.id
        });
        setShowAnswer(!showAnswer);
    }

    return (
        <Card className = "ReviewFlashCard" sx={{ maxWidth: 400, maxHeight: 500}} role="review-flashcard"
              aria-label="review-flashcard">
            {showAnswer ? <CardContent sx={{maxHeight: 10}}>
                <Stack direction="row" spacing={1}>
                    <TitleStyle
                        to={`/home/note/${props.noteId}`}
                        color="inherit"
                        underline="hover"
                        component={RouterLink}>
                        <Chip label={props.noteName} color="primary" onClick={() => console.log("Access note")}/>
                    </TitleStyle>
                </Stack>
            </CardContent> : null}

            <CardContent sx={{minHeight: 110}}>
                <Typography div color="text.primary">
                    <div dangerouslySetInnerHTML={{ __html: question }} />
                </Typography>
            </CardContent>
            <CardContent sx={{minHeight: 110}}>
                <Typography div>
                    {showAnswer ? <div dangerouslySetInnerHTML={{ __html: answer }} /> : null}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" aria-label="DisplayAnswer" onClick={displayAnswer}>
                    {showAnswer ? 'Hide Answer' : 'Show Answer'}
                </Button>
                {showAnswer ? <Button
                                      aria-label="RecordRemember"
                                      size="small"
                                      value="Remembered"
                                      onClick={sendResponse}>
                    Remembered
                </Button> : null}
                {showAnswer ? <Button size="small"
                                      value="Not remembered"
                                      onClick={sendResponse}>
                    Not remembered
                </Button> : null}
            </CardActions>
        </Card>
    );
}