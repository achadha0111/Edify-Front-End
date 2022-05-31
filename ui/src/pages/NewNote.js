import {styled} from "@mui/material/styles";
import React from 'react';

// import { Link as RouterLink } from 'react-router-dom';
// @mui
import {Card, Link, Container, Typography, Stack, Button, Grid, Box, TextField} from '@mui/material';
// hooks
// import useResponsive from '../hooks/useResponsive';

import Page from '../components/Page';
// import Iconify from "../components/Iconify";
// import {BlogPostCard, BlogPostsSort, NotesSearch} from "../sections/@dashboard/notes";
// import POSTS from "../_mock/blog";
import AddFlashCardForm from "../components/AddFlashCardForm";
import Toolbar from "../components/NotesToolbar";
import uid from "../utils/uid";
import EditableNotes from "../components/note-elements/EditableNotes";
import FlashCard from "../components/note-elements/FlashCard";

const RootStyle = styled('div')(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
        display: 'flex',
    },
}));

const HeaderStyle = styled('header')(({ theme }) => ({
    top: 0,
    zIndex: 9,
    lineHeight: 0,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    padding: theme.spacing(3),
    justifyContent: 'space-between',
    [theme.breakpoints.up('md')]: {
        alignItems: 'flex-start',
        padding: theme.spacing(7, 5, 0, 7),
    },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
    width: '100%',
    maxWidth: 464,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled('div')(({ theme }) => ({
    maxWidth: 480,
    margin: 'auto',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: theme.spacing(12, 0),
}));

class NewNote extends React.Component {
    constructor(props) {
        super(props);
        // this.updatePageHandler = this.updatePageHandler.bind(this);
        // this.addBlockHandler = this.addBlockHandler.bind(this);
        this.openFlashCardForm =this.openFlashCardForm.bind(this);
        this.closeFlashCardForm =this.closeFlashCardForm.bind(this);
        // this.deleteBlockHandler = this.deleteBlockHandler.bind(this);
        // this.focusManagerHandler = this.focusManagerHandler.bind(this);
        // this.flashCardFormClose = this.flashCardFormClose.bind(this);
        this.addNoteElement = this.addNoteElement.bind(this);
        this.updateNoteName = this.updateNoteName.bind(this);

        this.state = {
            flashCardFormOpen: false,
            newElement: {},
            noteName: 'Untitled'
        };
    }

    // const smUp = useResponsive('up', 'sm');
    //
    // const mdUp = useResponsive('up', 'md');

    openFlashCardForm () {
        this.setState({flashCardFormOpen: true});
    }

    closeFlashCardForm () {
        this.setState({flashCardFormOpen: false});
    }

    updateNoteName (noteName) {
        this.setState({noteName: noteName})
    }

    addNoteElement (data, source) {
        this.setState(
        {newElement:
                {
                    id: uid(),
                    noteName: this.state.noteName,
                    noteType: source,
                    data: data
                }
        })
    }

    render () {
        return (
            <Page title="Notes | New Note">
                <Container className="NotePage">
                    <div className="Toolbar">
                        <Toolbar openFlashCardForm={this.openFlashCardForm}
                                 addTextBlock={this.addNoteElement}
                                 updateNoteName={this.updateNoteName}
                                 addCodeBlock={this.addNoteElement}/>
                    </div>
                    <AddFlashCardForm open={this.state.flashCardFormOpen} close={this.closeFlashCardForm} saveFlashCard={this.addNoteElement}/>
                    <EditableNotes newElement={this.state.newElement} />
                </Container>
            </Page>
        )
    }
}

export default NewNote;