import PropTypes from "prop-types";
import {useState} from "react";
import Ansi from "ansi-to-react";

/** res["body"]["msg"][0]["data"]*/
export default function Result(props) {

    const resultType = props.displayContent[0]["type"] ? props.displayContent[0]["type"] : "";
        switch (resultType) {
            case "HTML":
                return <div className="CodeResultHTML"
                                      dangerouslySetInnerHTML={{__html: props.displayContent[0]["data"]}}>
                </div>
            case "TEXT":
                return <div className="CodeResultText"> <Ansi>{props.displayContent[0]["data"]}</Ansi></div>;
            default:
                return <div className="CodeResultText"></div>

        }
}

Result.propTypes = {displayContent: PropTypes.array};