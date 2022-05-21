/* This is the parent level blocks component. It receives the block type as prop
* and determines the correct component to render
* @input: id, type */

import React, {useRef} from "react";
import FlashCardBlock from "./FlashCardBlock";
import * as PropTypes from "prop-types";
import RichText from './RichText';
import './Blocks.css';

class NotesBlock extends React.Component {
    constructor(props) {
        super(props);
        this.blockType = props.noteType;
        this.blockRef = React.createRef();
        this.blockInFocus = this.blockInFocus.bind(this);
    }

    blockInFocus = () => {
        this.props.onFocusEnter({
            id: this.props.id,
            ref: this.blockRef.current
        });
    }

    render() {
        switch (this.blockType) {

            case "FlashCard":
                return <FlashCardBlock data={this.props.data} innerRef={this.blockRef} onFocus={this.blockInFocus}/>;
            // case "Code":
            //     return <Code data={props.data}/>;
            default:
                return <RichText data={this.props.data} innerRef={this.blockRef} onFocus={this.blockInFocus}/>;

        }
    }




}

export default NotesBlock;