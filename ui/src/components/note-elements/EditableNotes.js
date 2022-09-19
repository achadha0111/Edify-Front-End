import React from 'react';
import uid from '../../utils/uid';
import NotesBlock from "./NotesBlock";
import blockTypes from "../../utils/blockTypes";
import PropTypes from "prop-types";
import {createParagraph, updateParagraph} from "../../codeservice/ParagraphManager";

/**
 * This component is the parent level Notes component that manages state for a note
 * All async requests to the server for notes data will be made through here and rendering
 * will be handled through its children.
 *
 * */

class EditableNotes extends React.Component {
    constructor(props) {
        super(props);
        this.addBlock = this.addBlock.bind(this);
        this.updateCurrentBlockInFocus = this.updateCurrentBlockInFocus.bind(this);
        this.updateBlock = this.updateBlock.bind(this);
        this.deleteBlock = this.deleteBlock.bind(this);
        this.deleteCard = this.deleteCard.bind(this);
        this.saveNote = this.saveNote.bind(this);
        this.setCodeExecParams = this.setCodeExecParams.bind(this);
        this.state = {
            // Updated on first save
            id: null,
            blocks: props.blocks,
            blockInFocusRef: '',
            blockInFocusId: props.blocks[0]["fid"],
            zepNoteId: null
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.newElement.fid !== this.props.newElement.fid) {
            let currentBlockRef = this.state.blockInFocusRef;
            let currentBlockId = this.state.blockInFocusId;
            let currentBlock = {id: currentBlockId, ref: currentBlockRef};
            this.addBlock(currentBlock, this.props.newElement.type, this.props.newElement.data);
        } else if (prevProps.lastSaved !== this.props.lastSaved) {
            const noteTitle = this.props.noteName;
            this.saveNote(noteTitle).then(r => {
                if (!this.state.id) {
                    this.setState({id: r["noteDTO"]["id"]})
                }
                let updatedBlocks = r["noteDTO"]["blocks"];
                this.setState({blocks: updatedBlocks});
            }).catch(err => {
                // TODO Add proper error handling
            });
        } else if (prevProps.blocks !== this.props.blocks) {
            this.setState({blocks: this.props.blocks, id: this.props.noteId})
        } else if (prevProps.zepNoteId !== this.props.zepNoteId) {
            console.log("zep note id changed", this.props.zepNoteId)
            this.setState({zepNoteId: this.props.zepNoteId})
        }
        return null
    }

    /** Save note in the database
     * @param{string} noteName
     * @return{Object}
     * @public */
    async saveNote(noteName) {

        let noteBody = {noteName: noteName,
            blocks: this.state.blocks};

        if (this.state.id) {
            noteBody["id"] = this.state.id;
        }
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

    /** Updates state block focus variable
     * @param{Object} blockRef
     * @public */
    updateCurrentBlockInFocus(blockRef) {
        this.setState({blockInFocusId: blockRef.id, blockInFocusRef: blockRef.ref});
    }

    /** Update block in the note
     * @param{Object} updatedBlock
     * @param{Object | string} value
     * @public */
    updateBlock(updatedBlock, value) {
        const blocks = this.state.blocks;
        const index = blocks.map((b) => b.fid).indexOf(updatedBlock.id);
        const updatedBlocks = [...blocks];
        if (updatedBlocks[index].type === blockTypes.FlashCard) {
            // For flashcard type blocks, the data field is an array of values
            updatedBlocks[index].data[updatedBlock.cardKey] = value
        } else {
            updatedBlocks[index] = {
                ...updatedBlocks[index],
                data: value,
            };
        }

        this.setState({blocks: updatedBlocks});
    }

    setCodeExecParams(block) {
        const blocks = this.state.blocks;
        const index = blocks.map((b) => b.fid).indexOf(block.id);
        const updatedBlocks = [...blocks];
        updatedBlocks[index] = {
            ...updatedBlocks[index],
            zepParaId: block.paraId,
            result: block.execResult
        };

        this.setState({blocks: updatedBlocks});
        console.log(blocks);
    }

    /** Delete block from the note
     * @public */
    deleteBlock() {
        const blocks = this.state.blocks;
        const index = blocks.map((b) => b.fid).indexOf(this.state.blockInFocusId);
        const updatedBlocks = [...blocks];
        if (updatedBlocks[index-1]) {
            updatedBlocks.splice(index, 1);
            updatedBlocks.forEach((block, index) => {
                block.locationIndex = index;
            });
            this.setState({ blocks: updatedBlocks, blockInFocusId: updatedBlocks[index-1].fid })
        }
    }

    /** Add block to the note
     * @param{object} currentBlock - block that is currently in focus
     * @param{string} newBlockType - type of the new block
     * @param{object | string} data - data for the new block, for flashcards, this is a list
     * @public */
    async addBlock(currentBlock, newBlockType, data) {
        const blocks = this.state.blocks;
        const index = blocks.map((b) => b.fid).indexOf(currentBlock.id);
        let newBlock = {fid: uid(), type: newBlockType, data: data, locationIndex: index + 1};
        const updatedBlocks = [...blocks];
        console.log(newBlockType);
        if (newBlockType === blockTypes.FlashCard && updatedBlocks[index].type !== blockTypes.FlashCard) {
            // Current block in focus is not a flashcard block and we have received a flashcard block
            // we update the new block data field to be a list containing block data received
            newBlock.data = [data]
            updatedBlocks.splice(index + 1, 0, newBlock);
        } else if (newBlockType === blockTypes.FlashCard && updatedBlocks[index].type === blockTypes.FlashCard) {
            // Current block in focus is a flashcard block and we have received a flashcard block so we
            // append data to its data array of cards
            updatedBlocks[index].data.push(data)
        } else {
            if (newBlockType === blockTypes.Code) {
                newBlock["zepNoteId"] = this.state.zepNoteId;
                console.log(this.state.zepNoteId);
            }
            // In all other cases, we just add a new block
            updatedBlocks.splice(index + 1, 0, newBlock);
        }



        updatedBlocks.forEach((block, index) => {
            block.locationIndex = index;
        });



        this.setState({blocks: updatedBlocks, blockInFocusId: newBlock.fid});
        console.log(blocks);
    }

    /** Delete card from a flashcard block
     * @param{object} cardData
     * @public */
    deleteCard(cardData) {
        const blocks = this.state.blocks;
        const index = blocks.map((b) => b.fid).indexOf(cardData.id);
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
                            key={block.fid}
                            id={block.fid}
                            noteType={block.type}
                            data={block.data}
                            block={block}
                            onFocusEnter={this.updateCurrentBlockInFocus}
                            updateData={this.updateBlock}
                            deleteBlock={this.deleteBlock}
                            deleteCard={this.deleteCard}
                            setCodeExecParams={this.setCodeExecParams}
                        />
                    );
                })}
            </div>
        )

    }
}

EditableNotes.propTypes = {
    /** Identifier for the note on the database */
    noteId: PropTypes.string,
    /** An array of blocks, initialised with a single element
     * but for notes fetched from the database, contains multiple
     * blocks
     */
    blocks: PropTypes.array.isRequired,
    /** An object containing data for a new block */
    newElement: PropTypes.object,
    /** Name of the note */
    noteName: PropTypes.string
}
export default EditableNotes;