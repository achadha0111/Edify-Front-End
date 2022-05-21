import katex from "katex";
import _ from "lodash";

function convertToMath(text) {
    function replacer(match, p1) {
        return katex.renderToString(p1,{
            throwOnError: false
        });
    }

    let mathText = _.replace(text, /\$(.*?)\$/g, replacer);
    return mathText;

}

export default convertToMath;