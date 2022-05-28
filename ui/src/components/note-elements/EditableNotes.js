/* This component is the parent level Notes component that manages state for a note
*  All async requests to the server for notes data will be made through here and rendering
*  will be handled through its children. */

import React from 'react';
import uid from '../../utils/uid';
import NotesBlock from "./NotesBlock";

// This block always displays on adding a new note
const initialBlock = {id: uid(), noteType: "RichText", data: {}}

class EditableNotes extends React.Component {
    constructor(props) {
        super(props);
        // Function declarations
        this.addBlock = this.addBlock.bind(this);
        this.updateCurrentBlockInFocus = this.updateCurrentBlockInFocus.bind(this);
        this.updateBlock = this.updateBlock.bind(this);
        this.deleteBlock = this.deleteBlock.bind(this);
        this.deleteCard = this.deleteCard.bind(this);
        // State
        this.state = {
            blocks: [initialBlock],
            blockInFocusRef: '',
            blockInFocusId: initialBlock.id,
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.newElement.id !== this.props.newElement.id) {
            let currentBlockRef = this.state.blockInFocusRef;
            let currentBlockId = this.state.blockInFocusId;
            let currentBlock = {id: currentBlockId, ref: currentBlockRef};
            this.addBlock(currentBlock, this.props.newElement.noteType, this.props.newElement.data);
        }
        return null
    }

    updateCurrentBlockInFocus(blockRef) {
        this.setState({blockInFocusId: blockRef.id, blockInFocusRef: blockRef.ref});
    }

    updateBlock(updatedBlock, value) {
        const blocks = this.state.blocks;
        const index = blocks.map((b) => b.id).indexOf(updatedBlock.id);
        const updatedBlocks = [...blocks];
        if (updatedBlocks[index].noteType === "FlashCard") {
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

        if (newBlockType === "FlashCard" && updatedBlocks[index].noteType !== 'FlashCard') {
            // Current block in focus is not a flashcard block and we have received a flashcard block
            // we update the new block data field to be a list containing block data received
            newBlock.data = [data]
            updatedBlocks.splice(index + 1, 0, newBlock);
        } else if (newBlockType === 'FlashCard' && updatedBlocks[index].noteType === 'FlashCard') {
            // Current block in focus is a flashcard block and we have received a flashcard block so we
            // append data to its data array of cards
            updatedBlocks[index].data.push(data)
        } else {
            // In all other cases, we just add a new text block
            updatedBlocks.splice(index + 1, 0, newBlock);
        }

        this.setState({ blocks: updatedBlocks});
    }

    deleteCard(cardIndex) {
        const blocks = this.state.blocks;
        const index = blocks.map((b) => b.id).indexOf(this.state.blockInFocusId);
        const updatedBlocks = [...blocks];
        updatedBlocks[index].data.splice(cardIndex, 1);
        this.setState({blocks: updatedBlocks})
    }

    // TODO this is very inefficient, we shouldn't be rerendering the entire
    // TODO blocks and flashcard everytime a value is changed in one block
    render () {
        return (
            <div className="Note">
                {this.state.blocks.map((block, index) => {
                    return (
                        <NotesBlock
                            tabIndex={index}
                            key={block.id}
                            id={block.id}
                            noteType={block.noteType}
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