import React, {Component} from 'react';
import './trainee-card.component.css';
import PropTypes from "prop-types";
import  userProfileMale from '../../assets/icons/user-profile.jpg';
import  userProfileFemale from '../../assets/images/femaleImage.jpg';
import  reportIco from '../../assets/icons/report-01.svg'
import tempIco from '../../assets/icons/temp.svg'
import {withTranslation} from "react-i18next";
import {GiChart} from "react-icons/gi";
import { withRouter } from "react-router-dom";
import {Button, Icon, Label, Menu} from 'semantic-ui-react'
class TraineeCardComponent extends Component {

    render() {
        const {t} = this.props;
        let {imgPath ,full_name , remainingDays , traineesId,isFemale ,openModalFn, modalRequestProfile, className, classNameAction} = this.props;
        if(!imgPath)
            imgPath = isFemale ?userProfileFemale  :userProfileMale ;
        return (
            <a className={"trainee-card " +(className ? className : '')} onClick={e => {
                e.stopPropagation();
                modalRequestProfile(traineesId)
            }}>
                <div className="user-img">
                    <img src={imgPath} width="56px"  alt={"user image"}   />
                </div>
                <div className="user-name">
                     <span> {full_name} </span>
                </div>
                <div className="remaining-days">
                    <span>
                        {remainingDays ? remainingDays +'  '+ t('traineeModal.remainingDays') : ''}
                    </span>
                </div>
                <div className={"action-icons d-flex justify-content-center "+(classNameAction ? classNameAction : '')} >
                    <div className="ico" onClick={e => {
                        e.stopPropagation();
                        this.props.history.push('/chat');
                    }}>
                        <img src={reportIco}  alt="icon" />
                    </div>
                    <div className="ico" onClick={e => {
                        e.stopPropagation();
                        openModalFn(1);
                    }}>
                        <img src={tempIco}  alt="icon" />
                    </div>
                    <div className="ico" >
                        <Button className='p-0' basic color='blue' onClick={e => {
                            e.stopPropagation();
                            this.props.history.push('/progress');
                        }}>
                            <GiChart/>
                        </Button>

                    </div>
                </div>
            </a>
        );
    }
}
TraineeCardComponent.propTypes = {
    id:PropTypes.number.isRequired,
    full_name: PropTypes.string.isRequired,
    imgPath : PropTypes.string,
    isFemale: PropTypes.bool,
    remainingDays : PropTypes.number,
    openModalFn : PropTypes.func,
    modalRequestProfile : PropTypes.func
}
export default  withTranslation('translation')(withRouter(TraineeCardComponent));