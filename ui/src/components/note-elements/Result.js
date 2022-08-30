import PropTypes from "prop-types";
import {useState} from "react";

/** res["body"]["msg"][0]["data"]*/
export default function Result(props) {
    const resultType = props.displayContent[0]["type"];

        switch (resultType) {
            case "HTML":
                return <div className="CodeResultHTML"
                                      dangerouslySetInnerHTML={{__html: props.displayContent[0]["data"]}}>
                </div>
            default:
                return <div className="CodeResultText"> {props.displayContent[0]["data"]} </div>;

        }
}

Result.propTypes = {displayContent: PropTypes.array};