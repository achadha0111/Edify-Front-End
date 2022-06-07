import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import {useState} from "react";

export default function Code(props) {

    const [code, setCode] = useState("");
    const [previousKey, setPreviousKey] = useState("");

    function checkForDelete(event) {
        setPreviousKey(event.key);
        if (event.key === "Backspace"
            && previousKey === "Shift"
            && code === "") {
            event.preventDefault();
            props.deleteBlock({});
        }
    }

    return (
            <CodeMirror
                className="Code"
                value=""
                height="200px"
                extensions={[python()]}
                onKeyUp={checkForDelete}
                onFocus={props.onFocus}
                onChange={(value, viewUpdate) => {
                    setCode(value);
                }}
            />
    );
}