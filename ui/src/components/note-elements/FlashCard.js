import React from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Collapse, IconButton} from "@mui/material";
import { styled } from '@mui/material/styles';
import convertToMath from "../../utils/inlineMathRender";

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

function ExpandMoreIcon() {
    return null;
}

export default function FlashCard(props) {
    const question = props.data.question;
    const answer = props.data.answer;

    const [expanded, setExpanded] = React.useState(false);

    // const handleExpandClick = () => {
    //     setExpanded(!expanded);
    // };

    const editFlashCard = () => {
        props.openFlashCardForm({
            question: question,
            answer: answer,
            cardKey: props.index
        })
    }

    const deleteCard = () => {
        props.deleteCard({
            cardKey: props.index
        })
    }

    // const handleFlashCardDelete = () => {
    //     props.d({
    //         question: question,
    //         answer: answer
    //     })
    // }

    return (
        <Card className = "FlashCard" sx={{ minWidth: 400, minHeight: 290}}>
            <CardContent>
                <Typography div sx={{ fontSize: 14 }} color="text.primary">
                    <div dangerouslySetInnerHTML={{ __html: convertToMath(question) }} />
                </Typography>
            </CardContent>
            <CardContent sx={{minHeight: 170}}>
                <Typography div>
                    <div dangerouslySetInnerHTML={{ __html: convertToMath(answer) }} />
                </Typography>
            </CardContent>
            {/*<Collapse in={expanded} timeout="auto" unmountOnExit>*/}
            {/*    */}
            {/*</Collapse>*/}
            <CardActions>
                <Button size="small">
                    Show Answer
                </Button>
                <Button size="small" onClick={editFlashCard}>Edit</Button>
                <Button size="small" onClick={deleteCard}>Delete</Button>
            </CardActions>
        </Card>
    );
}