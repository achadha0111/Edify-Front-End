import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import FlashCard from './FlashCard';
import './Blocks.css';
import ListSubheader from '@mui/material/ListSubheader';
import {Box, Button, Stack, TextField, Tooltip, Typography} from "@mui/material";
import AddCardIcon from '@mui/icons-material/AddCard';
import DeleteIcon from '@mui/icons-material/Delete';
// TODO This should take props to decide how to render the cards based on the number of cards present.

export default function FlashCardBlock(props) {
    let flashCardList = props.data;

    return (
            <ImageList className = "Cardbox" sx={{ width: 500, height: 350 }} tabIndex={props.tabIndex} onFocus={props.addCard}>

                <ImageListItem key="Subheader"  cols={2}>
                    <ListSubheader component="div" className="DeckControls">
                        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
                            <Typography variant="h4" gutterBottom>
                                {/* TODO This must be editable*/}
                                <TextField id="filled-basic" label="Deck Title" variant="standard" />
                            </Typography>
                            <Box className="fBar Buttons">
                                <Tooltip title="Delete deck">
                                    <Button variant="text" className="DeleteDeck">
                                        <DeleteIcon/>
                                    </Button>
                                </Tooltip>
                            </Box>
                        </Stack>
                    </ListSubheader>

                </ImageListItem>
                {flashCardList.map((qAndA, key) => (
                    <ImageListItem key={key}>
                        <FlashCard data={qAndA}/>
                    </ImageListItem>
                ))}
            </ImageList>
    );
}