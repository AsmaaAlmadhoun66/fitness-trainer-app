import React, {Component} from 'react';
import PropTypes from "prop-types";
import InputTextComponent from "../InputTextComponent/input-text.component";

class EmailInputComponent extends Component {
    constructor(props) {
        super(props);
       this.state = {
           hasError : false,
           isEmailNotValid : false
       }
    }
    changeHandler = e => {
        debugger;
        const value = e.target.value;
        const isRequired = this.props.isRequired;
        if(value.length === 0 && isRequired ) {

            this.setState({hasError :true,isEmailNotValid : false })
            if(this.props.validationFn) {
                this.props.validationFn(false , value);
            }
        }else {
            const isEmailValid  =  this.emailValidate(value);
            if(isEmailValid === false && value.length > 0) {
                this.setState({isEmailNotValid : true , hasError:true})
                if(this.props.validationFn) {
                    this.props.validationFn(false ,value);
                }
            }else {
                this.setState({hasError :false , isEmailNotValid : false })

                if(this.props.validationFn) {
                    this.props.validationFn(true , value);
                }
            }
        }
    }

    showError = (show)  =>  {
        this.setState({hasError : show})
    }
    emailValidate  = (val) => {
        return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(val);
    }
    render() {
        const {isArabic} = this.props;
        return (
            <div className="form-group app-primary-input">
                <label> {isArabic ? 'البريد الألكترونى' : 'Email'} </label>
                <input  type="email"
                        className={this.state.hasError  ? 'error-input form-control' : 'form-control'}
                        onChange={this.changeHandler}
                        name={this.props.name ? this.props.name : 'email'}
                        value={this.props.value}
                        required={this.props.isRequired}/>
                {
                    this.state.hasError  && !this.state.isEmailNotValid?
                        <small className="error-title">
                            {this.props.labelTitle } {isArabic ? 'البريد الألكترونى مطلوب !' : 'Email is Required !'}
                        </small> : null
                }
                {
                    this.state.hasError  && this.state.isEmailNotValid?
                        <small className="error-title">
                            {this.props.labelTitle } {isArabic ? 'إدخل البريد الألكترونى بشكل صحيح !' : 'Email is not' +
                            ' Valid !'}
                        </small> : null
                }
            </div>
        );
    }
}

EmailInputComponent.propTypes = {
    isRequired : PropTypes.bool.isRequired,
    paceHolderTitle : PropTypes.string,
    name: PropTypes.string,
    valueHandler : PropTypes.func,
    validationFn : PropTypes.func,
    value : PropTypes.string
}
export default EmailInputComponent;