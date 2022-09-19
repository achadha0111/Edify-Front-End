/* This is the parent level blocks component. It receives the block type as prop
* and determines the correct component to render
* @input: id, type */

import React from "react";
import FlashCardBlock from "./FlashCardBlock";
import RichText from './RichText';
import '../styles/Blocks.css';
import Code from "./Code";
import blockTypes from "../../utils/blockTypes";
import {Button, Stack, Tooltip} from "@mui/material";
import {Delete, PlayArrow} from "@mui/icons-material";
import AddFlashCardFormQuill from "../dialogs/AddFlashCardFormQuill";

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
        this.setCodeExecParams = this.setCodeExecParams.bind(this);

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
        this.props.updateData(
            {
                id: this.props.id,
                cardKey: this.state.cardKey
            },
            value);
    }

    delete = (deleteEntity) => {
        if (deleteEntity.cardKey >= 0) {
            this.props.deleteCard({id: this.props.id,
                cardIndex: deleteEntity.cardKey});
        } else {
            this.props.deleteBlock()
        }
    }

    setCodeExecParams = (data) => {
        this.props.setCodeExecParams({
            id: this.props.id,
            paraId: data.paraId,
            execResult: data.execResult});
    }

    displayComponent(blockType, tabIndex) {
        switch (blockType) {
            case blockTypes.FlashCard:
                return <FlashCardBlock
                    data={this.props.data}
                    onFocus={this.blockInFocus}
                    tabIndex={tabIndex}
                    openEditForm={this.openFlashCardForm}
                    delete={this.delete}
                    innerRef={this.blockRef}/>;

            case blockTypes.Code:
                return <Code data={this.props.data}
                             zepNoteId={this.props.zepNoteId}
                             innerRef={this.blockRef}
                             onFocus={this.blockInFocus}
                             tabIndex={tabIndex}
                             delete={this.delete}
                             updateData={this.updateData}
                             block={this.props.block}
                             setCodeExecParams={this.setCodeExecParams}/>
            default:
                return (
                    <div className="CellWithOptions" onFocus={this.blockInFocus} tabIndex={tabIndex} role="cell">
                        <Stack direction="row" className="CellControlStack" tabIndex={tabIndex}>
                            <RichText data={this.props.data}
                                      innerRef={this.blockRef}
                                      onFocus={this.blockInFocus}
                                      updateData={this.updateData}/>
                            <div aria-label="cellOptions" className="CellOptions">
                                <Tooltip title="Delete cell">
                                    <Button variant="text" className="DeleteCell" aria-label="DeleteCellButton" onClick={this.delete}>
                                        <Delete/>
                                    </Button>
                                </Tooltip>
                            </div>
                        </Stack>
                    </div>)

        }
    }

    render() {
        return (
            <div className="RichMediaBlock" role="cell" aria-label={this.blockType}>
                {this.displayComponent(this.blockType, this.props.tabIndex)}
                {/*TODO flashcard form, it creates too many instances
            TODO in the wrong place*/}
                <AddFlashCardFormQuill open={this.state.flashCardFormOpen}
                                  close={this.closeFlashCardForm}
                                  question={this.state.questionToEdit}
                                  answer={this.state.answerToEdit}
                                  saveFlashCard={this.updateData}/>
            </div>

        )
    }
}

export default NotesBlock;