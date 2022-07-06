import React from "react";
import ReactQuill from 'react-quill';
import '../styles/EditorStyles.css';
import 'katex/dist/katex.min.css';
import katex from 'katex';

window.katex = katex;

class RichText extends React.Component {
    // const [value, setValue] = useState('');
    constructor(props) {
        super(props);
        this.updateAndPropagateValue = this.updateAndPropagateValue.bind(this);
        this.state = {
            value: this.props.data,
        }
    }

    componentDidMount() {
        this.props.innerRef.current.focus();
    }

    updateAndPropagateValue(value) {
        this.setState({value: value});
        this.props.updateData(value);
    }

    // TODO While we are able to do math rendering, the equation editor doesn't reopen to edit an equation
    // TODO Save button doesn't work on the tooltip
    render () {
       return <ReactQuill
            className="RichTextEditor"
            theme="snow"
            value={this.state.value}
            onChange={this.updateAndPropagateValue}
            modules={RichText.modules}
            onFocus={this.props.onFocus}
            ref={this.props.innerRef}
            onKeyUp={this.checkForDelete}
        >
        </ReactQuill>
    }
}

RichText.modules = {
    toolbar: [
        [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
        [{size: []}],
        ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code'],
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

RichText.defaultProps = {
    data: ''
}

export default RichText;

