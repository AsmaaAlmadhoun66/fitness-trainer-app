import React, {Component} from 'react';
import PreAuthorizationComponent from "../../components/PreAuthorizationComponent/pre-authorization.component";
import EmailInputComponent from "../../components/EmailComponent/email-input.component";
import PrimaryButtonComponent from "../../components/ButtonComponent/primary-button.component";
import {withTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import AccountService from "../../services/account-service/account.service";
import InputTextComponent from "../../components/InputTextComponent/input-text.component";
import { toast } from 'react-toastify';
import ToasterComponent from "../../components/common/toaster/toaster.component";
class ForgetPasswordComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email : null,
            isLoading:false,
            emailValid : false,
        }

        this.emailRef = React.createRef();
    }

    onSubmit = () => {
        const {email} = this.state;
        if(!this.state.emailValid) {
            this.emailRef.current.showError(true);
            return;
        }
        const accountService = new AccountService();
        this.setState({isLoading:true})
        const {t} = this.props;
        accountService.forgetPassword(email).then(response => {
            this.setState({isLoading : false})
            // TODO: Handle Response ;
            console.log(response);

            if(response.status) {
                toast.success(t('forgetPwPage.success'))
            }else {
                // email not exist;
                toast.error(t('forgetPwPage.failed'))
            }
        }).catch(error => {
            this.setState({isLoading : false})
            console.log(error);
            toast.error(t('shared.errors.globalError'))

        });
    }
    makeEmailValidOrNot = (val) => {
        this.setState({emailValid : val})
    }
    onChangeHandler = e => {
        if(!e)
            return;
        e.preventDefault();
        const value = e.target.value;
        const name = e.target.name ;
        this.setState({[name] : value} , () => {
            console.log("Current state ==>" , this.state);
        });
    }
    render() {
        const {t} = this.props;
        return (
            <>
                <PreAuthorizationComponent>
                    <EmailInputComponent validationFn={this.makeEmailValidOrNot}  ref={this.emailRef} valueHandler={this.onChangeHandler}  isRequired={true} isArabic={t('local') === 'ar'} />
                    <PrimaryButtonComponent switchLoading={this.state.isLoading} clickHandler={this.onSubmit} title={t('shared.send')} />
                    <div className="mt-4 text-center">
                        <Link to="/login"> {t('login.title')} </Link>
                    </div>

                </PreAuthorizationComponent>
                <ToasterComponent />
            </>

        );
    }
}

export default withTranslation("translation") (ForgetPasswordComponent);