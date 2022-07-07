import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import {useEffect, useState} from "react";

export default function Code(props) {

    const [userCode, setUserCode] = useState("");
    const [previousKey, setPreviousKey] = useState("");

    return (
            <CodeMirror
                className="Code"
                value=""
                extensions={[python()]}
                onFocus={props.onFocus}
                onChange={(value, viewUpdate) => {
                    setUserCode(value);
                }}
            />
    );
}