import React, {Component} from 'react';
import './login.cmponent.css';
import PreAuthorizationComponent from "../../components/PreAuthorizationComponent/pre-authorization.component";
import InputTextComponent from "../../components/InputTextComponent/input-text.component";
import PrimaryButtonComponent from "../../components/ButtonComponent/primary-button.component";
import { withTranslation } from "react-i18next";
import {Link, withRouter} from "react-router-dom";
import ToasterComponent from "../../components/common/toaster/toaster.component";
import AccountService from "../../services/account-service/account.service";
import { toast } from 'react-toastify';

class LoginComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email : null,
            password:null,
            isLoading:false,
            emailValid : false,
            passwordValid : false,

        }
        this.emailRef = React.createRef();
        this.passwordRef = React.createRef();
    }

    componentWillMount() {
       const notAuth =  new URLSearchParams(this.props.location.search).get("notAuth");
        const notActive =  new URLSearchParams(this.props.location.search).get("notActive");
       if(notAuth ) {
           toast.warn("قم بتسجيل الدخول اولاً" , {position:'top-center'})
       }
       if(notActive) {
           toast.warn("حسابك غير نشط" , {position:'top-center'})
       }
    }

    onSubmit = async () => {

        const {email , password} = this.state;
        const data = {
            email,password
        }
        if(!this.state.emailValid || !this.state.passwordValid){
             if(!this.state.emailValid) {
                 this.emailRef.current.showError(true);
             }
            if(!this.state.passwordValid) {
                this.passwordRef.current.showError(true);
            }
            return;
        }




        const accountService = new AccountService();
        this.setState({isLoading:true})
        const {t} = this.props;
        accountService.login(data).then(response => {
            this.setState({isLoading : false})
              if(response && response.status && response.result) {

                accountService.becomeAuthorize(response.result.token ).then(_ => {
                    accountService.userData = response.result;

                    // set account type .

                    if(response.result.is_saas) {
                        accountService.Account_Type = "SAS";
                    }else {
                        accountService.Account_Type = "Miran";
                    }

                    if(response.result.status === "pending") {
                        accountService.becomeActive(false).then(_ => {
                            this.props.history.push("/confirm-alert");
                        });

                    }

                     // activated

                    if(response.result.status === "activated") {
                        accountService.becomeActive(true).then(_ => {
                            this.props.history.push("/");
                        });

                    }
                });
               }else {
                  toast.error(t('shared.errors.notFoundUser'))
              }
            }).catch(error => {
            // todo: handling error.
            toast.error("Error")


        });
    }

      makeEmailValidOrNot = (val) => {
        this.setState({emailValid : val})
      }

    makePwValidOrNot = (val) => {
        this.setState({passwordValid : val})
    }
    onChangeHandler = (e) => {

        if(!e)
            return ;
        const value = e.target.value;
        this.setState({[e.target.name] : value} , () => {
            console.log('current state = ', this.state);
        });
    }
    render() {
        const {t} = this.props;
        return (
            <>
           <PreAuthorizationComponent>
               <form>
                   <InputTextComponent validationFn={this.makeEmailValidOrNot} ref={this.emailRef} valueHandler={this.onChangeHandler} name="email" isRequired={true} isArabic={t('local') === 'ar'} labelTitle={t('register.email')}/>
                   <InputTextComponent validationFn={this.makePwValidOrNot} ref={this.passwordRef} valueHandler={this.onChangeHandler} name="password" isRequired={true} isArabic={t('local') === 'ar'}  labelTitle={t('login.password')} isPassword={true}/>
                    <div className="form-group d-flex mt-4">
                        <div className="round flex-grow-1">
                            <input type="checkbox" id="checkbox"/>
                            <label htmlFor="checkbox">
                            </label>
                            <span className="checbox-lable"> {t('login.rememberMe')} </span>
                        </div>
                        <div>
                            <Link to={'/forget-pw'}>
                                {t('login.forgetPW')}
                            </Link>
                        </div>
                    </div>
                   <PrimaryButtonComponent switchLoading={this.state.isLoading} clickHandler={this.onSubmit}  title={t('login.title')}/>
                   <div className="text-center mt-4 reg-title">
                       <span>
                           {t('login.newTrainer')}
                       </span>
                       <Link to={'/register'} >
                           {t('login.signUp')}
                       </Link>
                   </div>
               </form>

                </PreAuthorizationComponent>
                <ToasterComponent />
                </>
        );
    }
}

export default  withTranslation("translation")( withRouter( LoginComponent));