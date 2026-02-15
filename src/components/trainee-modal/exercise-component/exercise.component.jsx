import React, {Component} from 'react';
import QierPlayer from 'qier-player';
import {withTranslation} from "react-i18next";
import './exercise.component.css';
import {FiX, FiMaximize, FiMove, FiPlus} from "react-icons/fi";
import BreakDayComponent from "../../common/empty-page/breakDay.component";
import TemplateServices from "../../../services/template-service/template.service";
import {toast} from "react-toastify";
import ToasterComponent from "../../common/toaster/toaster.component";
import {BsClockHistory} from "react-icons/bs";
import {BiCopy} from "react-icons/bi";
import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io";
import SearchableListTemplateComponent
    from "../../assign-template/searchable-list-template/searchable-list-template.component";
import MusclesService from "../../../services/trainee-service/muscles.service";
import {  Loader } from "semantic-ui-react";
import ExerciseService from "../../../services/trainee-service/exercise.service";
import SearchableListWithImgTemplateComponent
    from "../../assign-template/searchable-list-template/searchable-list-withImg-template.component";
import ModalComponent from "../../common/modal/modal.component";
import AddDaysTemplateComponent from "../../assign-template/add-days-template/add-days-template.component";
import EmptyComponent from "../../common/empty-page/empty.component";
import PrimaryButtonComponent from "../../ButtonComponent/primary-button.component";
import PropTypes from "prop-types";
import EmptyDataComponent from "../../common/empty-page/emptyData.component";
class ExerciseComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            muscles: [],
            openExceriseListDetails: false,
            openMuscleExerciseList: false,
            loader: true,
            loader2: true,
            muscleExercise: [],
            ExceriseMuscleItem: '',
            ExerciseId: 1,
            exerciseId_selected: 1,
            exerciseIdTemplate_selected: 1,
            openCopyModel: false,
            copyDays: [],
            exercise_template: 1
        }
    }
    openDetailsFunc(item){
        this.props.openDetailsExceriseFunction(item);
    }
    deleteExerciseTemplate(e,id){
        e.stopPropagation();
        // deleteExerciseTemplate
        const {t} = this.props;
        const templateServices = new TemplateServices();
        const data = {
            'template_day_exercises_id': id,
        }
        console.log(id)
        templateServices.deleteExerciseTemplate(data).then(response => {
            if (response) {
                toast.done(t('shared.success.addedSuccess'));
                this.props.getTemplateForDay2();
            } else {
                toast.done(t('shared.success.addedSuccess'));
            }
        })
    }
    addDays(pushObj){
        let daysButton = this.state.copyDays;
        if (!daysButton.includes((pushObj.key+1)+'')) {
            daysButton.push((pushObj.key+1)+'');
        }
        else{
            let objToDelete = (pushObj.key+1)+'';
            daysButton.splice(daysButton.indexOf(objToDelete), 1);
        }
        this.setState({daysButton: daysButton});
    }
    copyExerciseTemplate(e,id,exercise_template){
        e.stopPropagation();
        if(!exercise_template){
            this.setState({exerciseId_selected : id})
        }
        else {
            this.setState({exerciseIdTemplate_selected : id})
        }
        this.setState({'openCopyModel' : true, copyDays : ['1'], exercise_template: exercise_template})

    }
    submitCopyExerciseTemplate(e){
        const {t,exerciseMealData} = this.props;
        let {copyDays, exerciseId_selected, exerciseIdTemplate_selected, exercise_template} = this.state;
        if(exercise_template){
            this.templateCopyExerciseDay(copyDays,exerciseIdTemplate_selected)
        }
        else {
            copyDays =JSON.stringify(copyDays);
            const templateServices = new TemplateServices();
            const data = {
                'template_day_exercise_id': exerciseId_selected,
                'days': copyDays
            }
            templateServices.templateCopyExercise(data).then(response => {
                if (response) {
                    toast.done(t('shared.success.addedSuccess'));
                    this.props.getTemplateForDay2();
                    this.setState({'openCopyModel' : false})
                } else {
                    toast.done(t('shared.success.addedSuccess'));
                }
            })
        }

    }
    templateCopyExerciseDay(copyDays, id){
        const {t, exerciseMealData} = this.props;
        const templateServices = new TemplateServices();
        copyDays =JSON.stringify(copyDays);
        const data = {
            'template_day_id': id,
            'days': copyDays
        }
        templateServices.templateCopyExerciseDay(data).then(response => {
            if (response) {
                toast.done(t('shared.success.addedSuccess'));
                this.setState({'openCopyModel' : false})
                this.props.getTemplateForDay2();
            } else {
                toast.done(t('shared.success.addedSuccess'));
            }
        })
    }
    addTemplateBreakDay = (id) => {
        const {t} = this.props;
        const templateServices = new TemplateServices();
        const dataBreak = {
            'template_day_id': id,
            'type': 'exercise',
        }
        templateServices.addTemplateBreakDay(dataBreak).then(response => {
            if (response.status) {
                toast.done(t('shared.success.addedSuccess'));
                this.props.getTemplateForDay2();
            } else {
                toast.done(t('shared.success.addedSuccess'));
            }
        })
    }
    async componentWillMount() {
        const musclesService  = new MusclesService();
        this.setState({isLoading : true})
        musclesService.muscles.then(data => {
            this.setState({isLoading : false})
            if(data && data.status) {
                this.setState({muscles : data.result, loader : false})
            }
        }).catch(error => {
            this.setState({isLoading : false})
        })
    }
    exercise_muscleFunc = async (el) => {
        const exerciseService  = new ExerciseService();
        this.setState({isLoading : true, openExceriseListDetails: false, openMuscleExerciseList: true})
        exerciseService.exercise_muscle(el.title).then(data => {
            this.setState({isLoading : false})
            if(data) {
                this.setState({muscleExercise : data.result, loader2 : false, ExerciseId: el.id
                     })
            }
        }).catch(error => {
            this.setState({isLoading : false})
        })
    }
    openModalToAdd= (e)=>{
        this.setState({openModal : true, ExceriseMuscleItem: e})
    }
    renderDaysButtons = ()  => {
        let daysButton = [];
        for (let i = 1; i <= this.props.daysNumber; i++) {
            daysButton.push(
                <span key={i} className={i === 1 ? 'active' : ''}>
                    {i}
               </span>
            )
        }
        return daysButton;
    }
    render() {
        const {t, exerciseMealData, daysNumber}  = this.props;
        const {openExceriseListDetails, ExerciseId,ExceriseMuscleItem, muscles, muscleExercise, openMuscleExerciseList}  = this.state;
        const buttons = this.renderDaysButtons();
        return (
            <>
            <div className={["container" , (!openExceriseListDetails && !openMuscleExerciseList) ? '' : ' d-none']}>
                <ToasterComponent />

                <div>
                    {!(exerciseMealData)?
                        <EmptyDataComponent title={t('traineeModal.emptyDataExercise')}/> :
                        exerciseMealData.day.break_day_exercise ?
                        <BreakDayComponent/> :
                        !( exerciseMealData.day.exercises  &&  exerciseMealData.day.exercises.length) ?
                            <EmptyDataComponent title={t('traineeModal.emptyDataExercise')}/> :
                            exerciseMealData.day.exercises.map(item =>
                                <>
                                    <div className="row" key={item.exercise.exercise_id} onClick={(e) =>
                                    {
                                        e.preventDefault();
                                        this.openDetailsFunc(item);
                                    }}>
                                        <div className="col-sm-4">
                                            <div className="video">
                                                <QierPlayer
                                                    srcOrigin={'https://testing.miranapp.com/media/'+item.exercise.video}
                                                    language="en"
                                                    width={200}
                                                    height={100}
                                                    showVideoQuality={true}
                                                    src480p={'https://testing.miranapp.com/media/'+item.exercise.video}
                                                    src1080p={''}
                                                    src720p={null}
                                                    src2k={''}
                                                    src4k={''}
                                                    themeColor="#00a4f8"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <ul className={t('local') === 'ar' ? ' data text-right' : 'data'} >
                                                <li>
                                                    <h5> {t('local') === 'ar' ? item.exercise.title_ar : item.exercise.title}</h5>
                                                </li>
                                                <li>
                                                    <span className="key">
                                                       {t('progressPage.weight')} ({t('traineeModal.kGram')}) :
                                                    </span>
                                                    <span className="val">
                                                       {item.weight}
                                                    </span>
                                                </li>
                                                <li>
                                                    <span className="key">
                                                        {t('traineeModal.Reps')}  :
                                                    </span>
                                                    <span className="val">
                                                       {item.count}
                                                    </span>
                                                </li>
                                                <li>
                                                    <span className="key">
                                                       {t('traineeModal.rest')} :
                                                    </span>
                                                    <span className="val">
                                                         {item.rest_period}
                                                     </span>
                                                </li>
                                            </ul>
                                        </div>

                                        <div className="col-sm-4">
                                            <div className="icons d-flex flex-row-reverse">
                                                <span className="icon delete" onClick={(e)=> this.deleteExerciseTemplate(e,item.template_day_exercises_id)}>
                                                     <FiX/>
                                                </span>
                                                                    <span className="icon copy" onClick={(e)=> this.copyExerciseTemplate(e,item.template_day_exercises_id,0)}>
                                                    <BiCopy />
                                                </span>
                                                                    <span className="icon move">
                                                    <FiMove />
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <hr/>
                                </>
                            )
                    }
                </div>
                <div className={"AddMealTemplateComponent row p-0 mt-4"}>
                    <div className="col-sm-7">
                        <span className='text-primary f-2'>
                            {t('traineeModal.Calories')} :
                        </span>
                        <span>
                        </span>
                    </div>
                    <div className="meal-buttons col-sm-5 text-left">
                        <button onClick={(e)=> this.setState({openExceriseListDetails:true})} className="btn primary-color">
                            <FiPlus />
                            <div><small>{t('traineeModal.addExercise')}</small></div>
                        </button>
                        <button className="btn danger-color" onClick={(e)=>this.addTemplateBreakDay(exerciseMealData.day.id)}>
                            <BsClockHistory />
                            <div><small>{t('traineeModal.breakDay')}</small></div>
                        </button>
                        <button className="btn primary-color" onClick={(e)=>this.copyExerciseTemplate(e,exerciseMealData.day.id,1)}>
                            <BiCopy />
                            <div><small>{t('traineeModal.copyExercise')}</small></div>
                        </button>
                    </div>
                </div>
            </div>
            <div className={["container" , openExceriseListDetails ? '' : ' d-none']}>
                <button className='ui button icon primary p-1 mb-3' onClick={(e)=> this.setState({openExceriseListDetails:false})}>
                    {t('local') === 'ar'?  <i><IoIosArrowForward/> </i>: <i><IoIosArrowBack/></i> }
                </button>
                {
                    this.state.loader ? <Loader active={true} inline='centered'/> :
                        <SearchableListTemplateComponent exercise_muscleFunc={(e)=> this.exercise_muscleFunc(e)} list={muscles}/>
                }
            </div>
            <div className={["container" , openMuscleExerciseList ? '' : ' d-none']}>
                <button className='ui button icon primary p-1 mb-3' onClick={(e)=> this.setState({openMuscleExerciseList:false, openExceriseListDetails:true})}>
                    {t('local') === 'ar'?  <i><IoIosArrowForward/> </i>: <i><IoIosArrowBack/></i> }
                </button>
                {  muscleExercise !== null?
                    this.state.loader2 ? <Loader active={true} inline='centered'/> :
                        <SearchableListWithImgTemplateComponent  getTemplateForDay2={(e)=> {this.props.getTemplateForDay2(e)}} activeDay={exerciseMealData.day.id} ExerciseId={ExerciseId} list={muscleExercise} openModalToAdd={(e)=> this.openModalToAdd(e)} />
                   :''
                }
            </div>
                <ModalComponent  Actions={
                    <div className='text-center w-100'>
                        <button className='btn-secondary w-75' onClick={(e)=>this.submitCopyExerciseTemplate(e)}>
                            {t('shared.add')}
                        </button>
                    </div>

                } isOpen={this.state.openCopyModel}  size='mini' handleClosed={(e)=> this.setState({'openCopyModel': false})}>
                    <h3 className='text-center'>  {t('traineeModal.titleCopyMeal')} </h3>
                    <div className="add-days-template row">
                        {buttons && buttons.length > 0 && buttons.map( (item,key)  => {
                            return (
                                <div className='col-sm-2 p-0 my-2'>
                                    <div key={key} className={['item-num  custom-item ', this.state.copyDays.includes((key+1)+'')  ? ' active':'']} onClick={(e)=>this.addDays({key})}>
                                        {item}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                </ModalComponent>

            </>
        );
    }
}
ExerciseComponent.propTypes = {
    getTemplateForDay2: PropTypes.func
}
export default withTranslation('translation') (ExerciseComponent);