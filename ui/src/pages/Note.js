import React, {useEffect, useState} from 'react';
import {CircularProgress, Container, Grid} from '@mui/material';

import Page from '../components/Page';
import Toolbar from "../components/NotesToolbar";
import uid from "../utils/uid";
import EditableNotes from "../components/note-elements/EditableNotes";
import {useLocation, useNavigate} from "react-router-dom";
import blockTypes from "../utils/blockTypes";
import AddFlashCardFormQuill from "../components/dialogs/AddFlashCardFormQuill";
import {styled} from "@mui/material/styles";
import {UseAuth} from "../auth/Auth";
import {MakeRequest} from "../api/apiRequest";

const Progress = styled('div')({
    margin: "auto",
    marginTop: "auto"
});

function Note() {
    const [flashCardFormOpen, setFlashCardFormOpen] = useState(false);
    const [newElement, setNewElement] = useState({});
    const [noteName, setNoteName] = useState("Untitled");
    const [dataFetched, setDataFetched] = useState(false);
    const [lastSaved, setLastSaved] = useState("");
    const [blocks, setBlocks] = useState([{fid: uid(), type: blockTypes.RichText, data: "", locationIndex: 0}])
    const [noteId, setNoteId] = useState(null)
    const location = useLocation();
    const navigate = useNavigate();
    const auth = UseAuth();

    useEffect(() => {
        if (auth.user) {
            const noteId = location["pathname"].split("/")[2]
            console.log(noteId);
            if (noteId) {
                fetchNoteBlocks(noteId).then(r => {
                    const note= r["note"]
                    setNoteId(noteId);
                    setBlocks([...note["blocks"]]);
                    setNoteName(note["noteName"])
                    setLastSaved(note["lastSaved"])
                });
            }
            setDataFetched(true);
        }
    }, [location, navigate, auth]);

    async function fetchNoteBlocks(id) {
        const endpoint = "/notes-api/getnote?id="+id
        return await MakeRequest("GET", endpoint, auth)
    }

    function saveNote () {
        setLastSaved(Date.now());
    }

    function openFlashCardForm () {
        setFlashCardFormOpen(true);
    }

    function closeFlashCardForm () {
        setFlashCardFormOpen(false);
    }

    function updateNoteName (noteName) {
        setNoteName(noteName);
    }

    function addNoteElement (data, source) {
        setNewElement({
                        fid: uid(),
                        noteName: noteName,
                        type: source,
                        data: data
                    })
    }

    return (
        <Page title={`Note | ${noteName}`}>
            <Container className="NotePage">
                <div className="Toolbar">
                    <Toolbar noteName={noteName}
                             openFlashCardForm={openFlashCardForm}
                             addTextBlock={addNoteElement}
                             updateNoteName={updateNoteName}
                             addCodeBlock={addNoteElement}
                             saveNote={saveNote}
                             lastSaved={lastSaved}/>
                </div>
                <AddFlashCardFormQuill open={flashCardFormOpen} close={closeFlashCardForm} saveFlashCard={addNoteElement}/>
                {dataFetched?
                    <EditableNotes
                    noteId={noteId}
                    blocks={blocks}
                    newElement={newElement}
                    lastSaved={lastSaved}
                    noteName={noteName}
                    auth={auth}/>:
                    <Grid container>
                        <Progress className="DataFetchPreloader">
                            <CircularProgress />
                        </Progress >
                    </Grid>}


            </Container>
        </Page>
    )
}

export default Note;