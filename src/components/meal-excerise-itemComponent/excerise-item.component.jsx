import React, {Component} from 'react';
import {withTranslation} from "react-i18next";
import './meal-excerise-item.component.css'
import {FiPlus} from "react-icons/fi";
import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io";
import {BiCopy, BiEditAlt} from "react-icons/bi";
import SearchableListTemplateComponent
    from "../assign-template/searchable-list-template/searchable-list-template.component";
import ModalComponent from "../common/modal/modal.component";
import ResourcesService from "../../services/trainee-service/resources.service";
import MusclesService from "../../services/trainee-service/muscles.service";
import {Label} from "semantic-ui-react";
import QierPlayer from "qier-player";
import UserService from "../../services/user-service/user.service";

class ExceriseItemComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openDetails2: true,
            __addModal__: false,
            muscles: [],
            openExceriseListDetails: false,
            imgDefaultPath: ''
        }
    }
    componentWillMount() {
        const userService = new UserService();
        this.setState({imgDefaultPath : userService.imageDefaultPath })
    }

    render() {
        const {t, openExceriseDetails, ExceriseDataItem} = this.props;
        const {__addModal__, muscles, openExceriseListDetails} =this.state;
        return (
            <>
                <div className={["container" , (openExceriseDetails) ? '' : ' d-none']}>
                    <button className='ui button icon primary p-1 mb-3' onClick={(e)=> this.props.parentCallExcersise(false)}>
                        {t('local') === 'ar'?  <i><IoIosArrowForward/> </i>: <i><IoIosArrowBack/></i> }
                    </button>
                    <div className="row">
                        <div className="col-sm-12 mb-3">
                            <div className="video">
                                <QierPlayer
                                    srcOrigin={this.state.imgDefaultPath+ExceriseDataItem.exercise.video}
                                    language="en"
                                    width='100%'
                                    height={300}
                                    showVideoQuality={true}
                                    src480p={this.state.imgDefaultPath+ExceriseDataItem.exercise.video}
                                    src1080p={''}
                                    src720p={null}
                                    src2k={''}
                                    src4k={''}
                                    themeColor="#00a4f8"
                                />
                            </div>
                        </div>
                        <div className="col-sm-3 text-center">
                            <div>
                                <label className='primary d-block'>
                                    {t('progressPage.weight')}
                                </label>
                                <Label className='p-3' size='medium'>{ExceriseDataItem.weight}</Label>
                            </div>
                            <div>
                                <label className='primary d-block'> {t('traineeModal.Reps')}  </label>
                                <Label className='p-3' size='medium'>{ExceriseDataItem.count}</Label>
                            </div>
                        </div>
                        <div className="col-sm-6 text-center">
                            <h4 className='mb-5'>{t('local') === 'ar'? ExceriseDataItem.exercise.title_ar : ExceriseDataItem.exercise.title}</h4>
                            <h4>{t('templatePage.comments')}</h4>
                        </div>
                        <div className="col-sm-3 text-center">
                            <div>
                                <label className='primary d-block'>
                                    {t('traineeModal.rest')}
                                </label>
                                <Label className='p-3' size='medium'>{ExceriseDataItem.rest_period}</Label>
                            </div>
                            <div>
                                <label className='primary d-block'> {t('traineeModal.sets')} </label>
                                <Label className='p-3' size='medium'>{ExceriseDataItem.sets}</Label>
                            </div>
                        </div>
                        <div className="col-sm-12">
                            <textarea value={ExceriseDataItem.comment} rows='4' className='bg-light w-100 my-4 form-control'/>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default withTranslation('translation')( ExceriseItemComponent);