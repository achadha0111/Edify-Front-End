import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import FlashCard from './FlashCard';
import './styles/Blocks.css';
import ListSubheader from '@mui/material/ListSubheader';
import {Box, Button, Stack, TextField, Tooltip, Typography} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {useState} from "react";

// TODO This probably won't be implemented here but the flashcard block must have a relation to the most recent text block
// TODO preceding it
export default function FlashCardBlock(props) {
    let flashCardList = props.data;
    const [deckName, setDeckname] = useState("Untitled")

    const updateDeckName = (event) => {
        setDeckname(event.target.value);
    }

    return (
            <ImageList className = "Cardbox" sx={{ maxHeight: 400 }} tabIndex={props.tabIndex} onFocus={props.onFocus}
            role="card-deck" aria-label="card-deck">

                <ImageListItem key="Subheader"  cols={2}>
                    <ListSubheader component="div" className="DeckControls">
                        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
                            <Typography variant="h4" gutterBottom>
                                {/* TODO This must be editable*/}
                                <TextField id="filled-basic" label="Deck Title" variant="standard" value={deckName}
                                          onChange={updateDeckName} />
                            </Typography>
                            <Box className="FBar Buttons">
                                <Tooltip title="Delete deck">
                                    <Button variant="text" className="DeleteDeck" onClick={props.deleteBlock}>
                                        <DeleteIcon/>
                                    </Button>
                                </Tooltip>
                            </Box>
                        </Stack>
                    </ListSubheader>

                </ImageListItem>
                {flashCardList.map((qAndA, key) => (
                    <ImageListItem key={key}>
                        <FlashCard data={qAndA} index={key} openFlashCardForm={props.openEditForm}
                                   deleteCard={props.deleteCard}/>
                    </ImageListItem>
                ))}
            </ImageList>
    );
}