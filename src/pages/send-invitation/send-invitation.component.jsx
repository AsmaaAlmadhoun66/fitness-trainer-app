import React, {Component} from 'react';
import './send-invitation.component.css';
import BreadcrumbComponent from "../../components/common/breadcrumb/breadcrumb.component";
import {withTranslation} from "react-i18next";
import EmailInputComponent from "../../components/EmailComponent/email-input.component";
import PrimaryButtonComponent from "../../components/ButtonComponent/primary-button.component";
import ModalComponent from "../../components/common/modal/modal.component";
import AccountService from "../../services/account-service/account.service";
import {ToastContainer , toast} from "react-toastify";
class SendInvitationComponent extends Component {
     constructor(props) {
         super(props);
         this.state = {
             email : '',
             disableBtn : true,
             open: false,
             loading : false
         }
     }

     validationHandler  = (notvalid , value ) => {
         this.setState({disableBtn: !notvalid , email : value} , () => {
             console.log("Current State => " , this.state)
         });
     }

     sendInvitation = () => {
         const accountService = new AccountService();
         const {email} = this.state;
         this.setState({loading : true})
         const {t} = this.props;
         const isArabic = t('local') === 'ar';
         accountService.setinvitation({email}).then(res => {
             debugger;
             this.setState({open : false , loading: false})
             if(res && res.result ==='User Exist, Notification has been sent') {
                 // send successfully;
                 setTimeout(() => {
                      toast.success(isArabic ? 'تم ارسالة الدعوة' : 'User Exist, Notification has been sent')
                       if(this.props.refreshApi) {
                           this.props.refreshApi();
                       }
                  } , 1000)
             }else if(res.result === 'User not Exists') {
                 toast.error(isArabic ? 'المستخدم غير موجود' : 'User not Exists')
             }

         }).catch(error => {
             this.setState({loading : false , open:false})
             toast.error(isArabic ? 'حدث خطأ ما' : 'Error has been happened !')
         })
     }

    render() {
         const {t} = this.props;
        return (
            <>
                <ToastContainer />
                <button className="btn btn-outline-primary" style={{borderRadius:'50px'}} onClick={e => {
                    this.setState({open:true})
                }}>
                    {t('menu.addUser')} +
                </button>
                <ModalComponent size="mini" isOpen={this.state.open} hideAction={true} handleClosed={e => {
                    this.setState({open:false})
                }}>
                    <div className="">
                        <EmailInputComponent isArabic={t('local') === 'ar'}
                                             value={this.state.email}
                                             validationFn={this.validationHandler}
                                             isRequired={true}  />
                                             <PrimaryButtonComponent disable={this.state.disableBtn} switchLoading={this.state.loading} clickHandler={this.sendInvitation} title={t('shared.save')} />
                    </div>
                </ModalComponent>
            </>
        );
    }
}

export default withTranslation('translation') (SendInvitationComponent);