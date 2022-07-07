import React, {useEffect, useState} from "react";
import ReactQuill, {Quill} from 'react-quill';
import '../styles/EditorStyles.css';
import 'katex/dist/katex.min.css';
import katex from 'katex';

window.katex = katex;

const SnowTheme = Quill.import("themes/snow");

class ExtendSnowTheme extends SnowTheme {
    constructor(quill, options) {
        super(quill, options);

        quill.on("selection-change", (range) => {
            if (range) {
                quill.theme.tooltip.show();
                quill.theme.tooltip.position(quill.getBounds(range));
            }
        });
    }
}

// Quill.register("themes/snow", ExtendSnowTheme);

function handleFormula() {
    let tooltip = this.quill.theme.tooltip;
    tooltip.edit('formula', 'myformula');

    let range = this.quill.getSelection();
    let preview = this.quill.getContents(range.index, range.length);
    console.log(preview);
}

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

// function formulaHandler() {
//    this.quill
// }

RichText.modules = {
    toolbar: {
        container: [[{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
        [{size: []}],
        ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code'],
        [{'list': 'ordered'}, {'list': 'bullet'},
            {'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image', 'video'],
        ['clean'],
        ['formula']],
        handlers: {
            formula: handleFormula
        }
    },
    clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
    },
}

RichText.defaultProps = {
    data: ''
}

