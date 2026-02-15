import React, {Component, useState} from 'react';
import PropTypes from 'prop-types';
import { FiX,FiMaximize,FiMove } from "react-icons/fi";
import {withTranslation} from "react-i18next";
import  './meal.component.css';
import AddMealTemplateComponent from "../../assign-template/add-meal-template/add-meal-template.component";
import MealItemComponent from "../../meal-excerise-itemComponent/meal-item.component";
import ExerciseMealTemplateComponent
    from "../../assign-template/exercise-meal-template/exercise-meal-template.component";
import BreakDayComponent from "../../common/empty-page/breakDay.component";
import TemplateServices from "../../../services/template-service/template.service";
import {toast} from "react-toastify";
import ToasterComponent from "../../common/toaster/toaster.component";
import {BiCopy} from "react-icons/bi";
import ModalComponent from "../../common/modal/modal.component";
import EmptyDataComponent from "../../common/empty-page/emptyData.component";
class MealComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullTemplateDataForThisDay : '',
            openDetails: false,
            mealId_selected: 1,
            copyDays: [],
            openCopyModel: false,
            mealItemTemplateToggle: 0,
        }
    }
    openDetailsFunc(item){
        this.props.openDetailsFunction(item);
    }
    componentDidMount() {
        const {t} = this.props;
        toast.done(t('shared.success.addedSuccess'));
    }
    calculateCaloriesTotal(){
        let {caloriesTotal}=0;
         caloriesTotal = this.props.exerciseMealData.day.meals.reduce((totalCal,item) => totalCal = totalCal + item.nutrition_info.calories, 0 );
         return caloriesTotal
    }
    calculateFatTotal(){
        let {fatTotal}=0;
        fatTotal=this.props.exerciseMealData.day.meals.reduce((totalFat,item) => totalFat = totalFat + item.nutrition_info.fat, 0 );
        return fatTotal
    }
    calculateCarbsTotal(){
        let {carbsTotal}=0;
        carbsTotal=this.props.exerciseMealData.day.meals.reduce((carbsTotal,item) => carbsTotal = carbsTotal + item.nutrition_info.carbs, 0 );
        return carbsTotal
    }
    calculateProteinTotal(){
        let {proteinTotal}=0;
        proteinTotal=this.props.exerciseMealData.day.meals.reduce((proteinTotal,item) => proteinTotal = proteinTotal + item.nutrition_info.protein, 0 );
        return proteinTotal
    }

    deleteMealTemplate(id){
        // deleteMealTemplate
        const {t} = this.props;
        const templateServices = new TemplateServices();
        const data = {
            'template_day_meal_id': id,
        }
        templateServices.deleteMealTemplate(data).then(response => {
            if (response) {
                toast.done(t('shared.success.addedSuccess'));
                this.props.getTemplateForDay2();
            } else {
                toast.done(t('shared.success.addedSuccess'));
            }
        })
    }
    openModalCopyMeal(e,id, mealItemTemplateToggle){
        e.stopPropagation();
        this.setState({'openCopyModel' : true, copyDays : ['1'], mealId_selected : id, mealItemTemplateToggle: mealItemTemplateToggle })
    }
    submitTemplateCopyMeal(id){
        const {t,exerciseMealData} = this.props;
        let {copyDays, mealId_selected, mealItemTemplateToggle} = this.state;
        if(mealItemTemplateToggle){
            this.templateCopyMaelDay(copyDays);
        }
        else{
            copyDays =JSON.stringify(copyDays);
            console.log(copyDays);
            const templateServices = new TemplateServices();
            const data = {
                'template_day_meal_id': mealId_selected,
                'days': copyDays
            }
            templateServices.templateCopyMeal(data).then(response => {
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
    templateCopyMaelDay(copyDays){
        const {t, exerciseMealData} = this.props;
        let Dayid= exerciseMealData.day.id;
        const templateServices = new TemplateServices();
        copyDays =JSON.stringify(copyDays);
        const data = {
            'template_day_id': Dayid,
            'days':copyDays
        }
        templateServices.templateCopyMaelDay(data).then(response => {
            if (response) {
                toast.done(t('shared.success.addedSuccess'));
               // this.props.parentTriggerAdd();
                this.props.getTemplateForDay2();
                this.setState({'openCopyModel' : false})
            } else {
                toast.done(t('shared.success.addedSuccess'));
            }
        })
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
    render() {
        const {t, templateId, daysNumber,activeDay, exerciseMealData, getTemplateForDay} = this.props;
        const buttons = this.renderDaysButtons();

        return (
            <div className="meal">

                {exerciseMealData.day.break_day_meal ?
                    <BreakDayComponent/> :
                        !(exerciseMealData.day.meals  && exerciseMealData.day.meals.length) ?
                            <EmptyDataComponent title={t('traineeModal.emptyDataMeal')}/> :
                              exerciseMealData.day.meals.map((item,i) =>
                                    <>
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <h5 className={t('local') === 'ar' ? 'text-right' : 'text-left'}> {item.meal.title} </h5>
                                                <div className="images">
                                                    {
                                                        (item.meal.foods) ? item.meal.foods.map(item =>
                                                                <span>
                                                        <img className='w-100' src={'https://testing.miranapp.com/media/'+item.image} alt="image" />
                                                        </span>

                                                        ) : ''
                                                    }
                                                </div>
                                            </div>
                                            <div className="col-sm-6 text-left">
                                                <div className="icons d-flex flex-row-reverse">
                                                <span className="icon delete" onClick={(e)=> this.deleteMealTemplate(item.template_day_meal_id)}>
                                                    <FiX />
                                                </span>
                                                    <span className="icon copy" onClick={(e)=> this.openModalCopyMeal(e,item.template_day_meal_id,0)}>
                                                    <BiCopy />
                                                </span>
                                                    <span className="icon move">
                                                    <FiMove />
                                                </span>
                                                </div>
                                                <button className="btn btn-secondary w-50 mt-3 p-1" onClick={(e) =>
                                                {
                                                    e.preventDefault();
                                                    this.openDetailsFunc(item);
                                                }}>
                                                    {t('traineeModal.mealDetails')}
                                                </button>
                                            </div>
                                            <div className="col-sm-6">
                                                <div>
                                                    <span className="key"> {t('traineeModal.calories')} : </span>
                                                    <span className="val"> {item.nutrition_info.calories}  </span>
                                                </div>
                                                <div>
                                                    <span className="key"> {t('traineeModal.fat')} : </span>
                                                    <span className="val"> {item.nutrition_info.fat}  </span>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div>
                                                    <span className="key"> {t('traineeModal.carbs')} : </span>
                                                    <span className="val"> {item.nutrition_info.carbs}  </span>
                                                </div>
                                                <div>
                                                    <span className="key"> {t('traineeModal.protein')} : </span>
                                                    <span className="val"> {item.nutrition_info.protein}  </span>
                                                </div>
                                            </div>
                                        </div>
                                        <hr/>
                                    </>)

                }
                <div className={t('local')==='ar' ? 'row text-right' : 'row'}>
                    <div className="col-sm-8 mt-4">
                                <div className="d-flex align-items-center">
                                        <span className="strip-title">
                                            {t('traineeModal.totalDayIntakes')}
                                        </span>
                                    <div className="stripe grey">
                                        <div className="">
                                            <span className="key"> {t('traineeModal.calories')}: </span>
                                            <span className="val"> {this.calculateCaloriesTotal()} </span>
                                        </div>
                                        <div className="">
                                            <span className="key"> {t('traineeModal.carbs')}: </span>
                                            <span className="val"> {this.calculateCarbsTotal()} </span>
                                        </div>
                                        <div className="">
                                            <span className="key"> {t('traineeModal.fat')}: </span>
                                            <span className="val"> {this.calculateFatTotal()}  </span>
                                        </div>
                                        <div className="">
                                            <span className="key"> {t('traineeModal.protein')} : </span>
                                            <span className="val"> {this.calculateProteinTotal()} </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center mt-2">
                            <span className="strip-title">
                                {t('traineeModal.totalTargetIntakes')}
                            </span>
                                    <div className="stripe primary-color">
                                        <div className="">
                                            <span className="key"> {t('traineeModal.calories')}: </span>
                                            <span className="val"> 0  </span>
                                        </div>
                                        <div className="">
                                            <span className="key"> {t('traineeModal.carbs')}: </span>
                                            <span className="val"> 0  </span>
                                        </div>
                                        <div className="">
                                            <span className="key"> {t('traineeModal.fat')}: </span>
                                            <span className="val"> 0  </span>
                                        </div>
                                        <div className="">
                                            <span className="key"> {t('traineeModal.protein')} : </span>
                                            <span className="val"> 0  </span>
                                        </div>
                                    </div>
                                </div>
                    </div>
                    <div className={"AddMealTemplateComponent col-sm-4 p-0 mt-4"}>
                        <div className="meal-buttons justify-content-center">
                            <AddMealTemplateComponent dayNumbers={daysNumber} parentTriggerAdd={(e)=> {this.props.getTemplateForDay2()}}  exerciseMealData={this.props.exerciseMealData} activeDay={activeDay} templateId={templateId}/>
                            <button className="btn primary-color p-1"  onClick={(e)=> this.openModalCopyMeal(e,null, 1)}>
                                <BiCopy />
                                <div><small>{t('traineeModal.copyMeal')}</small></div>
                            </button>
                        </div></div>
                </div>

                <ModalComponent  Actions={
                    <div className='text-center w-100'>
                        <button className='btn-secondary w-75' onClick={(e)=>this.submitTemplateCopyMeal(e)}>
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



            </div>
        );
    }
}
MealComponent.propTypes = {
    meadId: PropTypes.number.isRequired ,
    mealTitle:PropTypes.string.isRequired,
    images : PropTypes.array,
    calories:PropTypes.number,
    fat:PropTypes.number,
    carbs:PropTypes.number,
    protein:PropTypes.number,
    templateId:PropTypes.number,
    activeDay:PropTypes.number,
    getTemplateForDay2: PropTypes.func
}
export default withTranslation('translation') (MealComponent);