/* This is the parent level blocks component. It receives the block type as prop
* and determines the correct component to render
* @input: id, type */

import React from "react";
import FlashCardBlock from "./FlashCardBlock";
import RichText from './RichText';
import './styles/Blocks.css';
import AddFlashCardForm from "../dialogs/AddFlashCardForm";
import Code from "./Code";
import DeleteDialog from "../dialogs/ConfirmDelete";

class NotesBlock extends React.Component {
    constructor(props) {
        super(props);
        this.blockType = props.noteType;
        this.blockRef = React.createRef();
        this.blockInFocus = this.blockInFocus.bind(this);
        this.displayComponent = this.displayComponent.bind(this);
        this.deleteBlock = this.deleteBlock.bind(this);
        this.openFlashCardForm = this.openFlashCardForm.bind(this);
        this.closeFlashCardForm = this.closeFlashCardForm.bind(this);
        this.openDeleteDialog = this.openDeleteDialog.bind(this);
        this.closeDeleteDialog = this.closeDeleteDialog.bind(this);
        this.state = {
            flashCardFormOpen: false,
            questionToEdit: '',
            answerToEdit: '',
            cardKey: '',
            deleteConfirmOpen: false
        }
    }

    openFlashCardForm (currentQA) {
        this.setState({questionToEdit: currentQA.question,
            answerToEdit: currentQA.answer,
            cardKey: currentQA.cardKey,
            flashCardFormOpen: true});
    }

    closeFlashCardForm () {
        this.setState({flashCardFormOpen: false});
    }

    closeDeleteDialog () {
        this.setState({deleteConfirmOpen: false});
    }

    blockInFocus = () => {
        this.props.onFocusEnter({
            id: this.props.id,
            ref: this.blockRef.current
        });
    }

    updateData = (value, _) => {
        this.props.updateData({id: this.props.id,
            cardKey: this.state.cardKey}, value);
    }

    openDeleteDialog = (cardKey) => {
        this.setState({deleteConfirmOpen: true})
    }

    deleteCard = (cardKey) => {
        this.props.deleteCard({id: this.props.id,
            cardIndex: cardKey})
    }

    deleteBlock = () => {
        this.props.deleteBlock()
    }

    displayComponent(blockType, tabIndex) {
        switch (blockType) {
            case "FlashCard":
                return <FlashCardBlock
                    data={this.props.data}
                    onFocus={this.blockInFocus}
                    tabIndex={tabIndex}
                    openEditForm={this.openFlashCardForm}
                    deleteCard={this.deleteCard}
                    deleteBlock={this.deleteBlock}
                    innerRef={this.blockRef}/>;
            case "Code":
                return <Code onFocus={this.blockInFocus} deleteBlock={this.deleteBlock} innerRef={this.blockRef} tabIndex={tabIndex}/>
            default:
                return <RichText data={this.props.data}
                          innerRef={this.blockRef}
                          onFocus={this.blockInFocus}
                          updateData={this.updateData}
                          deleteBlock={this.deleteBlock}/>;
        }
    }

    render() {
        return (
            <div className="RichMediaBlock" role="cell" aria-label={this.blockType}>
                {this.displayComponent(this.blockType, this.props.tabIndex)}
                {/*TODO flashcard form, it creates too many instances
                TODO in the wrong place*/}
                <AddFlashCardForm open={this.state.flashCardFormOpen}
                                  close={this.closeFlashCardForm}
                                  question={this.state.questionToEdit}
                                  answer={this.state.answerToEdit}
                                  saveFlashCard={this.updateData}/>
            </div>
        )

    }


}

export default NotesBlock;