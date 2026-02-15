import React, {Component} from 'react';
import {withTranslation} from "react-i18next";
import  './add-exercise-template.component.css';
import UserService from "../../../services/user-service/user.service";
import TemplateServices from "../../../services/template-service/template.service";
import {toast} from "react-toastify";
import InputTextComponent from "../../InputTextComponent/input-text-no-label.component";
import PrimaryButtonComponent from "../../ButtonComponent/primary-button.component";
import {TextArea} from "semantic-ui-react";
import QierPlayer from "qier-player";

class AddExerciseTemplateComponent extends  React.Component {

    constructor(props) {
        super(props);
        this.state = {
            imgDefaultPath: '',
            openExceriseListDetails: false,
            weight:'', comment:'', count:'', rest_period:'', sets: '',
            ExerciseId :  this.props.exerciseMealForThisDay.exercise_id || {},
            activeDay :  this.props.activeDay2 || {}
        }
    }
    componentWillMount() {
        const userService = new UserService();
        this.setState({imgDefaultPath : userService.imageDefaultPath })
    }
    onChangeHandler = (e) => {
        if(!e)
            return ;
        const value = e.target.value;
        this.setState({[e.target.name] : value});
    }
    async addExerciseToTemplate(e) {
        const {weight, comment, sets, count, rest_period, ExerciseId, activeDay} = this.state;
        const templateServices = new TemplateServices();
        const data = {
            'exercise_id': ExerciseId,
            'template_day': activeDay,
            'weight': weight,
            'comment': comment,
            'count': count,
            'sets': sets,
            'rest_period': rest_period
        }
        templateServices.addExerciseToTemplate(data).then(response => {
            if (response) {
                //      toast.done(t('shared.success.addedSuccess'));
                this.props.getTemplateForDay2();
                this.props.closeModal();
            } else {
                //  toast.done(t('shared.success.addedSuccess'));
            }
        })
    }
    render() {
        const {t, exerciseMealForThisDay} = this.props;
        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-sm-12 text-center">
                        <QierPlayer
                            srcOrigin={this.state.imgDefaultPath+exerciseMealForThisDay.video}
                            language="en"
                            width='100%'
                            height={230}
                            showVideoQuality={true}
                            src480p={this.state.imgDefaultPath+exerciseMealForThisDay.video}
                            src1080p={''}
                            src720p={null}
                            src2k={''}
                            src4k={''}
                            themeColor="#00a4f8"
                        />
                    </div>
                    <div className="col-sm-12 text-center">
                        <h4 className='my-2'>{t('local')==='ar' ? exerciseMealForThisDay.title_ar : exerciseMealForThisDay.title}</h4>
                    </div>
                    <div className="col-sm-4 text-center">
                        <div>
                            <label className='primary d-block'>
                                {t('progressPage.weight')}
                            </label>
                            <InputTextComponent  valueHandler={this.onChangeHandler} name='weight' className='w-100 text-center' isRequired/>
                        </div>
                        <div>
                            <label className='primary d-block'> {t('traineeModal.Reps')}  </label>
                            <InputTextComponent  valueHandler={this.onChangeHandler} name='count' className='w-100 text-center' isRequired/>
                        </div>
                    </div>
                    <div className="col-sm-4"></div>
                    <div className="col-sm-4 text-center">
                        <div>
                            <label className='primary d-block'>
                                {t('traineeModal.rest')}
                            </label>
                            <InputTextComponent  valueHandler={this.onChangeHandler} name='rest_period' className='w-100 text-center'  isRequired/>
                        </div>
                        <div>
                            <label className='primary d-block'> {t('traineeModal.sets')} </label>
                            <InputTextComponent  valueHandler={this.onChangeHandler} name='sets' className='w-100 text-center' />
                        </div>
                    </div>
                    <div className="col-sm-12 text-center">
                        <h4>{t('templatePage.comments')}</h4>
                    </div>
                    <div className="col-sm-12">
                        <TextArea rows='4' name='comment'
                                  onChange={this.onChangeHandler}
                                  className='bg-light w-100 my-4 form-control'/>
                    </div>
                </div>
                <div className="meal-buttons text-center">
                    <button className='ui btn w-50 m-auto btn-secondary' onClick={(e)=>this.addExerciseToTemplate(e)}> {t('shared.add')} </button>
                </div>

            </React.Fragment>
        );
    }
}

export default withTranslation('translation')( AddExerciseTemplateComponent);