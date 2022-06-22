/* This is the parent level blocks component. It receives the block type as prop
* and determines the correct component to render
* @input: id, type */

import React from "react";
import FlashCardBlock from "./FlashCardBlock";
import RichText from './RichText';
import '../styles/Blocks.css';
import AddFlashCardForm from "../dialogs/AddFlashCardForm";
import Code from "./Code";

class NotesBlock extends React.Component {
    constructor(props) {
        super(props);
        this.blockType = props.noteType;
        this.blockRef = React.createRef();
        this.blockInFocus = this.blockInFocus.bind(this);
        this.displayComponent = this.displayComponent.bind(this);
        this.delete = this.delete.bind(this);
        this.openFlashCardForm = this.openFlashCardForm.bind(this);
        this.closeFlashCardForm = this.closeFlashCardForm.bind(this);

        this.state = {
            flashCardFormOpen: false,
            questionToEdit: '',
            answerToEdit: '',
            cardKey: ''
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

    delete = (deleteEntity) => {
        if (deleteEntity.cardKey >= 0) {
            this.props.deleteCard({id: this.props.id,
                cardIndex: deleteEntity.cardKey});
        } else {
            this.props.deleteBlock()
        }
    }

    displayComponent(blockType, tabIndex) {
        switch (blockType) {
            case "NotesFlashCard":
                return <FlashCardBlock
                    data={this.props.data}
                    onFocus={this.blockInFocus}
                    tabIndex={tabIndex}
                    openEditForm={this.openFlashCardForm}
                    delete={this.delete}
                    innerRef={this.blockRef}/>;
            case "Code":
                return <Code onFocus={this.blockInFocus} deleteBlock={this.delete} innerRef={this.blockRef} tabIndex={tabIndex}/>
            default:
                return <RichText data={this.props.data}
                          innerRef={this.blockRef}
                          onFocus={this.blockInFocus}
                          updateData={this.updateData}
                          deleteBlock={this.delete}/>;
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