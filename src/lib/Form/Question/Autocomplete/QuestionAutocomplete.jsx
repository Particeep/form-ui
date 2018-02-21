import "./QuestionAutocomplete.scss";

import React, {Component} from "react";
import {MenuItem} from "material-ui/Menu";
import {Checkbox, FormControl, Icon, Input, InputAdornment, Menu, Radio} from "material-ui";

class QuestionAutocomplete extends Component {

    state = {
        anchorEl: null,
        filter: null
    };

    render() {
        const {value, question, multiSelect, messages} = this.props;
        const {anchorEl} = this.state;
        return (
            <div>
                <FormControl onClick={this.open} fullWidth>
                    <Input value={multiSelect ? value.join(', ') : value} multiline readOnly rows="1" rowsMax="10"
                           endAdornment={
                               <InputAdornment position="end">
                                   <Icon className="Qac_adornment">arrow_drop_down</Icon>
                               </InputAdornment>
                           }
                    />
                </FormControl>
                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={this.close}>
                    <header className={'Qac_Menu_head' + (multiSelect ? ' -withCb' : '')}>
                        {multiSelect &&
                        <Checkbox onChange={this.selectAll}
                                  indeterminate={value.length > 0 && value.length < question.possibilities.length}/>
                        }
                        <input className="Qac_Menu_input" placeholder={messages.search + '...'}
                               onChange={e => this.setState({filter: e.target.value})}/>
                    </header>
                    <div className="Qac_Menu_items">
                        {this.getFilteredPossibilities().map(p =>
                            <MenuItem key={p.id} onClick={() => this.handleChange(p.label)} style={{paddingLeft: 0}}>
                                {multiSelect && <Checkbox checked={value.indexOf(p.label) !== -1}/>}
                                {!multiSelect && <Radio checked={value.indexOf(p.label) !== -1}/>}
                                {p.label}
                            </MenuItem>
                        )}
                    </div>
                </Menu>
            </div>
        );
    }

    open = event => {
        console.log("OPEN");
        console.log(event.currentTarget);
        this.setState({anchorEl: event.currentTarget});
    };

    close = () => {
        this.setState({anchorEl: null});
    };

    handleChange = (value) => {
        let newValue;
        if (this.props.multiSelect) {
            if (this.props.value.indexOf(value) === -1) newValue = this.props.value.concat(value);
            else newValue = this.props.value.filter(v => v !== value);
        } else {
            if (this.props.value.indexOf(value) === -1) newValue = value;
            else value = '';
            this.close();
        }
        this.props.onChange(newValue);
    };

    getFilteredPossibilities() {
        const {filter} = this.state;
        if (filter && filter !== '')
            return this.props.question.possibilities.filter(q => q.label.indexOf(this.state.filter) !== -1);
        return this.props.question.possibilities;
    }

    selectAll = (event, checked) => {
        const values = checked ? this.props.question.possibilities.map(p => p.label) : [];
        this.props.onChange(values);
    };
}

export default QuestionAutocomplete;