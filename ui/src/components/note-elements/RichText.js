import React, {useEffect, useState} from "react";
import ReactQuill from 'react-quill';
import '../styles/EditorStyles.css';
import 'katex/dist/katex.min.css';
import katex from 'katex';

window.katex = katex;

export default function RichText(props) {
    const [value, setValue] = useState(props.data);

    useEffect(() => {
        props.innerRef.current.focus()
    }, []);

    function updateAndPropagateValue(value) {
        setValue(value);
        props.updateData(value);
    }

    // TODO While we are able to do math rendering, the equation editor doesn't reopen to edit an equation
    // TODO Save button doesn't work on the tooltip
    return <ReactQuill
        className="RichTextEditor"
        theme="snow"
        value={value}
        onChange={updateAndPropagateValue}
        modules={RichText.modules}
        onFocus={props.onFocus}
        ref={props.innerRef}
    />
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

