/* This is the parent level blocks component. It receives the block type as prop
* and determines the correct component to render
* @input: id, type */

import React, {useRef} from "react";
import FlashCardBlock from "./FlashCardBlock";
import * as PropTypes from "prop-types";
import RichText from './RichText';
import './styles/Blocks.css';
import {Grid} from "@mui/material";
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

class NotesBlock extends React.Component {
    constructor(props) {
        super(props);
        this.blockType = props.noteType;
        this.blockRef = React.createRef();
        this.blockInFocus = this.blockInFocus.bind(this);
        this.displayComponent = this.displayComponent.bind(this);
        this.deleteBlock = this.deleteBlock.bind(this);
    }

    blockInFocus = () => {
        this.props.onFocusEnter({
            id: this.props.id,
            ref: this.blockRef.current
        });
    }

    // addCard = () => {
    //     this.props.addCard({
    //         id:this.props.id
    //     })
    // }

    updateData = (value) => {
        this.props.updateData({id: this.props.id}, value);
    }

    deleteBlock = () => {
        this.props.deleteBlock()
    }

    displayComponent(blockType, tabIndex) {
        switch (blockType) {
            case "FlashCard":
                return <FlashCardBlock
                    data={this.props.data}
                    innerRef={this.blockRef}
                    addCard={this.blockInFocus}
                    tabIndex={tabIndex}/>;
            // case "Code":
            //     return <Code data={props.data}/>;
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
            <div className="RichMediaBlock">
                {this.displayComponent(this.blockType, this.props.tabIndex)}
            </div>
        )

    }


}

export default NotesBlock;