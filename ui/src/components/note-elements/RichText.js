import React, { useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function RichText(props) {
    const [value, setValue] = useState('');
    return (
        <ReactQuill
            className="RichTextEditor"
            theme="snow"
            value={value}
            onChange={setValue}
            onFocus={props.onFocus}
            ref={props.innerRef}
        />
    );
}

export default RichText;

