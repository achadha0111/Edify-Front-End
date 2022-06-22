/* This component is the parent level Notes component that manages state for a note
*  All async requests to the server for notes data will be made through here and rendering
*  will be handled through its children. */

import React from 'react';
import uid from '../../utils/uid';
import NotesBlock from "./NotesBlock";

class EditableNotes extends React.Component {
    constructor(props) {
        super(props);
        // Function declarations
        this.addBlock = this.addBlock.bind(this);
        this.updateCurrentBlockInFocus = this.updateCurrentBlockInFocus.bind(this);
        this.updateBlock = this.updateBlock.bind(this);
        this.deleteBlock = this.deleteBlock.bind(this);
        this.deleteCard = this.deleteCard.bind(this);
        this.saveNote = this.saveNote.bind(this);
        // State
        this.state = {
            // Updated on first save
            id: null,
            blocks: props.blocks,
            blockInFocusRef: '',
            blockInFocusId: props.blocks[0].id,
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.newElement.id !== this.props.newElement.id) {
            console.log("adding block");
            let currentBlockRef = this.state.blockInFocusRef;
            let currentBlockId = this.state.blockInFocusId;
            let currentBlock = {id: currentBlockId, ref: currentBlockRef};
            this.addBlock(currentBlock, this.props.newElement.noteType, this.props.newElement.data);
        } else if (prevProps.lastSaved !== this.props.lastSaved) {
            const noteTitle = this.props.noteName;
            this.saveNote(noteTitle).then(r => {
                if (!this.state.id) {
                    this.setState({id: r["noteId"]})
                }
            });
        } else if (prevProps.blocks !== this.props.blocks) {
            this.setState({blocks: this.props.blocks})
        }
        return null
    }

    async saveNote(noteName) {
        console.log(noteName);
        let noteBody = {noteName: noteName,
            blocks: this.state.blocks};

        // Note exists so we provide an ID to update
        if (this.state.id) {
            noteBody["id"] = this.state.id;
        }

        console.log(noteBody);

        const response = await fetch('/notes-api/savenote', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(noteBody)
        })

        return response.json();
    }

    updateCurrentBlockInFocus(blockRef) {
        this.setState({blockInFocusId: blockRef.id, blockInFocusRef: blockRef.ref});
    }

    updateBlock(updatedBlock, value) {
        const blocks = this.state.blocks;
        const index = blocks.map((b) => b.id).indexOf(updatedBlock.id);
        const updatedBlocks = [...blocks];
        if (updatedBlocks[index].noteType === "NotesFlashCard") {
            // For flashcard type blocks, the data field is an array of values
            updatedBlocks[index].data[updatedBlock.cardKey] = value
        }
         else {
            updatedBlocks[index] = {
                ...updatedBlocks[index],
                data: value,
            };
        }

        this.setState({ blocks: updatedBlocks });
    }

    deleteBlock() {
        const blocks = this.state.blocks;
        const index = blocks.map((b) => b.id).indexOf(this.state.blockInFocusId);
        const updatedBlocks = [...blocks];
        if (updatedBlocks[index-1]) {
            updatedBlocks.splice(index, 1);
            this.setState({ blocks: updatedBlocks, blockInFocusId: updatedBlocks[index-1].id })
        }
    }

    addBlock(currentBlock, newBlockType, data) {
        let newBlock = { id: uid(), noteType: newBlockType, data: data};
        const blocks = this.state.blocks;
        const index = blocks.map((b) => b.id).indexOf(currentBlock.id);
        const updatedBlocks = [...blocks];

        if (newBlockType === "NotesFlashCard" && updatedBlocks[index].noteType !== 'NotesFlashCard') {
            // Current block in focus is not a flashcard block and we have received a flashcard block
            // we update the new block data field to be a list containing block data received
            newBlock.data = [data]
            updatedBlocks.splice(index + 1, 0, newBlock);
        } else if (newBlockType === 'NotesFlashCard' && updatedBlocks[index].noteType === 'NotesFlashCard') {
            // Current block in focus is a flashcard block and we have received a flashcard block so we
            // append data to its data array of cards
            updatedBlocks[index].data.push(data)
        } else {
            // In all other cases, we just add a new block
            updatedBlocks.splice(index + 1, 0, newBlock);
        }

        this.setState({ blocks: updatedBlocks, blockInFocusId: newBlock.id});
    }

    deleteCard(cardData) {
        const blocks = this.state.blocks;
        const index = blocks.map((b) => b.id).indexOf(cardData.id);
        const updatedBlocks = [...blocks];
        updatedBlocks[index].data.splice(cardData.cardIndex, 1);
        this.setState({blocks: updatedBlocks})
    }

    render () {
        return (
            <div className="Note">
                {this.state.blocks.map((block, index) => {
                    return (
                        <NotesBlock
                            tabIndex={index}
                            key={block.id}
                            id={block.id}
                            noteType={block.type}
                            data={block.data}
                            onFocusEnter={this.updateCurrentBlockInFocus}
                            updateData={this.updateBlock}
                            deleteBlock={this.deleteBlock}
                            deleteCard={this.deleteCard}
                        />
                    );
                })}
            </div>
        )

    }
}

export default EditableNotes;