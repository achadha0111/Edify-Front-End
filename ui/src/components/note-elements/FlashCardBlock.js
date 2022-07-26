import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import NotesFlashCard from './NotesFlashCard';
import '../styles/Blocks.css';
import ListSubheader from '@mui/material/ListSubheader';
import {Box, Button, Stack, TextField, Tooltip, Typography} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {useState} from "react";
import DeleteDialog from "../dialogs/ConfirmDelete";
import PropTypes from "prop-types";

// TODO This probably won't be implemented here but the flashcard block must have a relation to the most recent text block
// TODO preceding it

/** Parent component for holding and displaying flashcards **/
export default function FlashCardBlock(props) {
    let flashCardList = props.data;
    const [deckName, setDeckname] = useState("Untitled")
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [entity, setEntity] = useState("")

    /** Update flashcard deckname
     * @param{HTMLElementEventMap} event
     * @public **/
    const updateDeckName = (event) => {
        setDeckname(event.target.value);
    }

    /** Opens delete confirmation dialog
     * @param{object} deleteEntity
     * @public **/
    const openDeleteConfirm = (deleteEntity) => {
        if (deleteEntity.cardIndex >= 0) {
            setEntity(deleteEntity.cardIndex);
        } else {
            props.onFocus();
            setEntity("Deck");
        }
        setDeleteOpen(true);
    }

    /** Close delete dialog
     * @public
     */
    const closeDeleteDialog = () => {
        setDeleteOpen(false)
    }

    /** Carry out delete
     *
     * @param{object} deleteEntity
     * @public
     */
    const executeDelete = (deleteEntity) => {
        if (deleteEntity !== "Deck") {
            props.delete({cardKey: deleteEntity});
        } else {
            props.delete({});
        }
        setDeleteOpen(false);
    }

    return (
        <div className="Cardbox" onFocus={props.onFocus} tabIndex={props.tabIndex}>
            <DeleteDialog open={deleteOpen}
                          entity={entity}
                          close={closeDeleteDialog}
                          delete={executeDelete}/>

            <ImageList sx={{ maxHeight: 400 }} role="card-deck" aria-label="card-deck">
                <ImageListItem key="Subheader" cols={2}>
                    <ListSubheader component="div" className="DeckControls">
                        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
                            <Typography variant="h4" gutterBottom>
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
                    <ImageListItem key={key} cols={2}>
                        <NotesFlashCard data={qAndA} index={key} openFlashCardForm={props.openEditForm}
                                        deleteCard={openDeleteConfirm}/>
                    </ImageListItem>
                ))}
            </ImageList>
        </div>

    );
}

FlashCardBlock.propTypes = {
    /** Function to update state's blockInFocusId */
    onFocus: PropTypes.func,
    /** Number to enable focus on Safari */
    tabIndex: PropTypes.number,
    /** Function to execute delete of card or flashcard */
    delete: PropTypes.func,
    /** An array containing list of flashcard objects **/
    data: PropTypes.array
}