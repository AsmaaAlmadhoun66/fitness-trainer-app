import React, {Component} from 'react';
import  './phone-number-input.component.css';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import PropTypes from 'prop-types';
import ru from 'react-phone-number-input/locale/el.json'

import InputTextComponent from "../InputTextComponent/input-text.component";
class PhoneNumberInputComponent extends Component {
    render() {
        return (
            <div className="form-group phone-input">
                {
                    this.props.label ? <label> {this.props.label} </label> : null
                }
                <PhoneInput
                    country="SA"
                    defaultCountry="SA"
                    onChange={this.props.onChange}

                    value={this.props.value}
                    international
                    withCountryCallingCode
                />

            </div>
        );
    }
}

PhoneNumberInputComponent.propTypes = {
    value : PropTypes.string,
    onChange :PropTypes.func,
    label : PropTypes.string,

}


export default PhoneNumberInputComponent;