import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import {useState} from "react";
import PropTypes from "prop-types";

/**
 * A component to display a cell containing code **/
export default function Code(props) {

    const [userCode, setUserCode] = useState(props.data);

    return (
            <CodeMirror
                className="Code"
                value={userCode}
                extensions={[python()]}
                onChange={(value, viewUpdate) => {
                    setUserCode(value);
                }}
            />
    );
}

Code.prototypes = {
    /** String containing code for the block **/
    data: PropTypes.string
}