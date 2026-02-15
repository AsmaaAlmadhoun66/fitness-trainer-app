import React, {Component} from 'react';
import { withTranslation } from "react-i18next";
import './faq.component.css';
import { toast } from 'react-toastify';
import ModalComponent from "../../components/common/modal/modal.component";
import InputTextComponent from "../../components/InputTextComponent/input-text-no-label.component";
import {FiPlus} from "react-icons/fi/index";
import UserService from "../../services/user-service/user.service";
import EmptyComponent from "../../components/common/empty-page/empty.component";
import AccountService from "../../services/account-service/account.service";
import PrimaryButtonComponent from "../../components/ButtonComponent/primary-button.component";
import ToasterComponent from "../../components/common/toaster/toaster.component";

class FaqComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            __addModal__ : false,
            faq: [],
            question: '',
            answer: ''
        }
    }
    componentWillMount() {
        this.fetchData();
    }
    fetchData = () => {
        const userService  = new UserService();
        this.setState({isLoading : true})
        userService.faq.then(data => {
            this.setState({isLoading : false})
            if(data) {
                this.setState({faq : data.result})
            }
        }).catch(error => {
            this.setState({isLoading : false})
        })
    }

    onSubmit = async () => {
        const {question , answer} = this.state;
        const data = {
            question,answer
        }
        const userService  = new UserService();
        this.setState({isLoading:true})
        const {t} = this.props;
        userService.addFaq(data).then(response => {
            this.setState({isLoading : false})
            if(response && response.message) {
                toast.done(t('shared.success.addedSuccess'));
                this.fetchData();
                this.onClose();
            }else {
                toast.error(t('shared.errors.globalError'))
            }
        }).catch(error => {
            // todo: handling error.
            toast.error("Error")
        });
    }

    showModalHandler =() => {
        this.setState({__addModal__ : true});
    }
    closeModalHandler = () =>  {
        this.setState({__addModal__ : false});
    }
    onChangeHandler = (e) => {
        if(!e)
            return ;
        const value = e.target.value;
        this.setState({[e.target.name] : value});
    }
    onClose = (e) => {
        if(e) {
            e.preventDefault();
        }
        this.setState({__addModal__:false , question : null, answer : null});
    }
    render() {
        const {t} = this.props;
        return (
            <>
                <div className="container px-5 position-relative">
                <h3 className='btn-primary text-center w-75 mx-auto mb-5'>{t('faqPage.faq')}</h3>
                    {
                        this.state.faq.length > 0 ?
                            this.state.faq.map( (item,i) => {
                                 return (
                                    <div className='my-2' key={i}>
                                        <label className='text-primary'>{item.question}</label>
                                        <p>{item.answer}</p>
                                        <hr/>
                                    </div>
                                );
                            })
                            :
                            <EmptyComponent />
                    }



                <button className='p-1 ui icon button primary position-absolute p-bottom font-size-large' style={ t('local') === 'ar' ? {left: '3rem'} : {right: '3rem' }} onClick={e => {
                    e.preventDefault();
                    this.setState({__addModal__:true})
                }}><FiPlus className='f-5-half'/></button>
                </div>
                <ToasterComponent />
                <ModalComponent size='mini' isOpen={this.state.__addModal__} hideAction={true} handleClosed={this.closeModalHandler} >
                    <div className="text-center mini-shared-modal px-3">
                        <h4 className='mb-4'>  {t('faqPage.addQuestion')} </h4>
                        <InputTextComponent
                            valueHandler={this.onChangeHandler}
                            name='question'
                            isArabic={t('local') === 'ar'} style={{textAlign:t('local') === 'ar' ? 'right' : 'left'}}
                            isRequired={true} labelTitle={t('faqPage.question')}  />
                        <InputTextComponent
                            valueHandler={this.onChangeHandler}
                            name='answer'
                            isArabic={t('local') === 'ar'} style={{textAlign:t('local') === 'ar' ? 'right' : 'left'}}
                            isRequired={true} labelTitle={t('faqPage.answer')}  />

                        <PrimaryButtonComponent switchLoading={this.state.isLoading} isSecondaryBtn='true' className='btn w-50' clickHandler={this.onSubmit} title={t('shared.add')}> </PrimaryButtonComponent>
                    </div>
                </ModalComponent>
            </>
        );
    }
}

export default  withTranslation("translation")( FaqComponent);