import React, { useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'katex/dist/katex.min.css';
import katex from 'katex';

window.katex = katex;

class RichText extends React.Component {
    // const [value, setValue] = useState('');
    constructor(props) {
        super(props);
        this.updateAndPropagateValue = this.updateAndPropagateValue.bind(this);
        this.state = {
            value: ''
        }
    }

    updateAndPropagateValue(value) {
        this.setState({value: value});
        this.props.updateData(value);
    }

    render () {
       return <ReactQuill
            className="RichTextEditor"
            theme="snow"
            value={this.state.value}
            onChange={this.updateAndPropagateValue}
            modules={RichText.modules}
            onFocus={this.props.onFocus}
            ref={this.props.innerRef}
        />
    }
}

RichText.modules = {
    toolbar: [
        [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
        [{size: []}],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'},
            {'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image', 'video'],
        ['clean'],
        ['formula']
    ],
    clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
    }
}

export default RichText;

