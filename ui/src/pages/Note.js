import React, {useEffect, useState} from 'react';
import {Container} from '@mui/material';

import Page from '../components/Page';
import AddFlashCardForm from "../components/dialogs/AddFlashCardForm";
import Toolbar from "../components/NotesToolbar";
import uid from "../utils/uid";
import EditableNotes from "../components/note-elements/EditableNotes";
import {useLocation} from "react-router-dom";

function Note() {
    const [flashCardFormOpen, setFlashCardFormOpen] = useState(false);
    const [newElement, setNewElement] = useState({});
    const [noteName, setNoteName] = useState("Untitled");
    const [lastSaved, setLastSaved] = useState(Date.now());
    const [blocks, setBlocks] = useState([{id: uid(), noteType: "RichText", data: ""}])
    const [noteId, setNoteId] = useState(null)
    const location = useLocation();

    useEffect(() => {
        const noteId = location["pathname"].split("/")[3]
        if (noteId) {
            fetchNoteBlocks(noteId).then(r => {
                const note= r["note"]
                note["blocks"][0]["id"] = uid();
                setNoteId(noteId);
                setBlocks([...note["blocks"]]);
                setNoteName(note["noteName"])
            })
        }
    }, [location])

    async function fetchNoteBlocks(id) {
        const endpoint = "/notes-api/getnote?id="+id
        const response = await fetch(endpoint, {
            method: "GET",
            mode: 'cors',
        })

        return response.json();
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
        console.log("Triggered add request")
        setNewElement({
                        id: uid(),
                        noteName: noteName,
                        noteType: source,
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
                <AddFlashCardForm open={flashCardFormOpen} close={closeFlashCardForm} saveFlashCard={addNoteElement}/>
                <EditableNotes
                    noteId={noteId}
                    blocks={blocks}
                    newElement={newElement}
                    lastSaved={lastSaved}
                    noteName={noteName}/>
            </Container>
        </Page>
    )
}

export default Note;