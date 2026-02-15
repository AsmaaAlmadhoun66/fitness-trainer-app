import React, {Component} from 'react';
import PropTypes from "prop-types";
import ModalComponent from "../common/modal/modal.component";
import {withTranslation} from "react-i18next";
import {AiOutlineClose} from "react-icons/ai";
import {BsCheck} from "react-icons/bs";
import TranieeService from "../../services/trainee-service/trainer.service";
import {toast} from "react-toastify";
import ToasterComponent from "../common/toaster/toaster.component";
import EmptyComponent from "../common/empty-page/empty.component";
import TraineeModalNoteComponent from "../trainee-modal/trainee-modal-note.component";

class ProfileModalComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpenProfile : false,
            notes: [],
            openModalNote: false
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const {isOpenProfile} = nextProps;
        this.setState({ isOpenProfile});
    }

    submitRequest = (Status) => {
        const {t, requestId} = this.props;
        const data = {
            'request' : requestId,
            'status' : Status
        }
        console.log('status' + data  );
        const tranieeService  = new TranieeService();
        this.setState({isLoading:true})
        tranieeService.acceptRequest(data).then(response => {
            this.setState({isLoading : false})
            if(response.status) {
                toast.done(t('shared.success.addedSuccess'));
                this.onClose();
            }else {
                toast.error(t('shared.errors.globalError'))
            }
        }).catch(error => {
            // todo: handling error.
            toast.error("Error")
        });
    }
    onClose = (e) => {
        if(e) {
            e.preventDefault();
        }
        this.setState({isOpen:false});
    }

    openModalHandlerNote = () => {
        this.setState({openModalNote : true, isOpenProfile: false})
    }
    render() {
        const { t,profileData, traineesId, requestClass, noteClass } = this.props;

        return (
            <div>
                <TraineeModalNoteComponent isOpen={this.state.openModalNote} handleClosed={e => {
                    e.stopPropagation();
                    this.setState({openModalNote:false, isOpenProfile:false})
                }}  traineesId={traineesId} />

                <ModalComponent size="tiny" isOpen={this.state.isOpenProfile}  handleClosed={e => {
                    this.setState({isOpenProfile:false, openModalNote:false})
                }}>
                        {
                            profileData.length > 0 ?
                                profileData.map( (item) =>
                                    item.id === traineesId ?
                                        <div className='card'>
                                            <div className="card-header text-right">
                                                <div className="row">
                                                    <div className="col-4">
                                                        <img src={'https://testing.miranapp.com/media/' + item.profile.avatar} className='w-100' alt="img_avatar"/>
                                                    </div>
                                                    <div className="col-8">
                                                        <h3 className='pb-3'>{t('traineeModal.notes')}</h3>
                                                        <div className={requestClass ? '': 'd-none'}>
                                                            <button className="ui button icon red py-2 px-3" onClick={()=>
                                                                this.submitRequest('rejected')
                                                            }>
                                                                <i><AiOutlineClose /></i>
                                                                <span>{t('shared.reject')}</span>
                                                            </button>
                                                            <button className="ui button icon primary py-2 px-3" onClick={()=>{
                                                                this.submitRequest('approved')
                                                            }}>
                                                                <i><BsCheck /></i>
                                                                <span>{t('shared.accept')}</span>
                                                            </button>
                                                        </div>
                                                        <div className={noteClass ? '': 'd-none'}>
                                                            <button className="ui button icon blue py-2 px-3"  onClick={this.openModalHandlerNote}>
                                                                <span>{t('traineeModal.notes')}</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                            <div className='card-body text-right'>
                                                <div className='my-2'>
                                                    <label className='text-primary'>{t('profile.BirthDate')}</label>
                                                    <p>{item.profile.birthdate}</p>
                                                    <hr/>
                                                </div>
                                                <div className='my-2'>
                                                    <label className='text-primary'>{t('profile.nationality')}</label>
                                                    <p>{t('local')==='ar' ? item.profile.nationality.name_ar : item.profile.nationality.name }</p>
                                                    <hr/>
                                                </div>
                                                <div className='my-2'>
                                                    <label className='text-primary'>{t('profile.height')}</label>
                                                    <p>{item.profile.height}</p>
                                                    <hr/>
                                                </div>
                                                <div className='my-2'>
                                                    <label className='text-primary'>{t('progressPage.weight')}</label>
                                                    <p>{item.profile.weight}</p>
                                                    <hr/>
                                                </div>

                                                <div className='my-2'>
                                                    <label className='text-primary'>{t('profile.levelOfActivity')}</label>
                                                    <p>{t('local')==='ar' ? item.profile.activity_level.title_ar: item.profile.activity_level.title}</p>

                                                    <div className="row">
                                                        <div className="col-6">
                                                            <label className='text-primary'>{t('profile.warning')}</label>
                                                            <p>{item.profile.warnings}</p>
                                                        </div>
                                                        <div className="col-6">
                                                            <label className='text-primary'>{t('profile.Allergies')}</label>
                                                            <p>{item.profile.allergies}</p>
                                                        </div>
                                                    </div>
                                                    <hr/>
                                                </div>
                                                <div className='my-2'>
                                                    <label className='text-primary'>{t('profile.myGoal')}</label>
                                                    <p>{t('local')==='ar' ? item.goal.title_ar : item.goal.title}</p>
                                                </div>

                                            </div>
                                        </div>
                                    : ''
                                )
                                :
                                <EmptyComponent />
                        }

                </ModalComponent>

            </div>
        );
    }
}

ProfileModalComponent.propTypes = {
    isOpenProfile : PropTypes.bool,
    requestId : PropTypes.number,
    profileData : PropTypes.array,
}

export default  withTranslation('translation')(ProfileModalComponent);

