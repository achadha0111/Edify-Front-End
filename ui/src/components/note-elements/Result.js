import PropTypes from "prop-types";
import {useState} from "react";
import Ansi from "ansi-to-react";

/** res["body"]["msg"][0]["data"]*/
export default function Result(props) {
    console.log(props.displayContent);

    const resultType = props.displayContent["type"] ? props.displayContent["type"] : "";
        switch (resultType) {
            case "HTML":
                return <div className="CodeResultHTML"
                                      dangerouslySetInnerHTML={{__html: props.displayContent["data"]}}>
                </div>
            case "TEXT":
                return <div className="CodeResultText"> <Ansi>{props.displayContent["data"]}</Ansi></div>;
            case "IMG":
                return <div className="CodeResultImg"> <img src={"data:image/png;base64," + props.displayContent["data"]}/> </div>;
            default:
                return <div className="CodeResultText"></div>

        }
}

Result.propTypes = {displayContent: PropTypes.array};