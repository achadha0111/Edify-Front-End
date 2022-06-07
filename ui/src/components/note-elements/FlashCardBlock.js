import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import FlashCard from './FlashCard';
import './styles/Blocks.css';
import ListSubheader from '@mui/material/ListSubheader';
import {Box, Button, Stack, TextField, Tooltip, Typography} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {useState} from "react";
import DeleteDialog from "../dialogs/ConfirmDelete";

// TODO This probably won't be implemented here but the flashcard block must have a relation to the most recent text block
// TODO preceding it
export default function FlashCardBlock(props) {
    let flashCardList = props.data;
    const [deckName, setDeckname] = useState("Untitled")
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [entity, setEntity] = useState("")

    const updateDeckName = (event) => {
        setDeckname(event.target.value);
    }

    const openDeleteConfirm = (deleteEntity) => {
        if (deleteEntity.cardIndex >= 0) {
            setEntity(deleteEntity.cardIndex);
        } else {
            setEntity("Deck");
        }
        setDeleteOpen(true);
    }

    const closeDeleteDialog = () => {
        setDeleteOpen(false)
    }

    const executeDelete = (deleteEntity) => {
        if (deleteEntity !== "Deck") {
            props.delete({cardKey: deleteEntity});
        } else {
            props.delete({});
        }
        setDeleteOpen(false);
    }

    return (
        <div>
            <DeleteDialog open={deleteOpen}
                          entity={entity}
                          close={closeDeleteDialog}
                          delete={executeDelete}/>

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
                                    <Button variant="text" className="DeleteDeck" onClick={openDeleteConfirm}>
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
                                   deleteCard={openDeleteConfirm}/>
                    </ImageListItem>
                ))}
            </ImageList>
        </div>

    );
}