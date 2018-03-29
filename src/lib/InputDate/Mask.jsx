import React, {Component} from "react";
import MaskedInput from "react-text-mask";
import {getDateFormatSeparator} from "../utils/common";

class Mask extends Component {

    render() {
        const {format} = this.props;
        return (
            <MaskedInput
                {...this.props}
                mask={this.buildMask(format)}
                placeholder={format}
            />
        );
    }

    buildMask(format) {
        const delimiter = getDateFormatSeparator(format);
        const yearRegex = [/[1-2]/, /\d/, /\d/, /\d/];
        const monthRegex = [/[0-1]/, /\d/];
        const dayRegex = [/[0-3]/, /\d/];

        let mask = format.split(new RegExp(`(${delimiter})`, 'g'));
        mask = this.replace(mask, 'yyyy', yearRegex);
        mask = this.replace(mask, 'MM', monthRegex);
        mask = this.replace(mask, 'dd', dayRegex);
        return mask;
    }

    replace(array, string, replacement) {
        const i = array.indexOf(string);
        if (i != null) array.splice(i, 1, ...replacement);
        return array;
    }
}

Mask.defaultProps = {
    format: 'dd/MM/yyyy'
};

export default Mask;