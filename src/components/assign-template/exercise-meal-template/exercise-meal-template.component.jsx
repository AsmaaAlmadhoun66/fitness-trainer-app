import React, {Component} from 'react';
import {Loader, Tab} from "semantic-ui-react";
import ExerciseComponent from "../../trainee-modal/exercise-component/exercise.component";
import MealComponent from "../../trainee-modal/meal-component/meal.component";
import {withTranslation} from "react-i18next";
import {toast} from "react-toastify";
import ToasterComponent from "../../common/toaster/toaster.component";
import AddDaysTemplateComponent from "../add-days-template/add-days-template.component";
import MealItemComponent from "../../meal-excerise-itemComponent/meal-item.component";
import ExceriseItemComponent from "../../meal-excerise-itemComponent/excerise-item.component";
import ModalComponent from "../../common/modal/modal.component";

class ExerciseMealTemplateComponent extends Component {
    constructor(props) {
        super(props);
        this.state={
            exerciseMealForThisDay: [],
            activeDay: 1,
            mealDataItem: [],
            ExceriseDataItem: [],
            openDetails: false,
            openExceriseDetails: false,
            loading: false
        }
    }
    async componentWillMount() {
       this.props.getTemplateForDay();
    }
    clickNumberHandler= (e) =>{
        this.setState({loading: true})
        const {templateId} = this.props;
        this.props.getTemplateForDay(templateId, e);
        this.setState({loading: false})

    }

    render() {

        const {t, templateId, daysNumber, exerciseMealForThisDay} = this.props;
        let {activeDay, mealDataItem, openDetails, openExceriseDetails, ExceriseDataItem} = this.state;
        return (
            <>
                <div className={openDetails || openExceriseDetails ? ' d-none':'' }>
                    <ToasterComponent />

                    <AddDaysTemplateComponent  daysNumber={daysNumber} getTemplateForDay2={(e) => this.props.getTemplateForDay(templateId, this.state.activeDay)} exerciseMealData={exerciseMealForThisDay} parentCallback={(e)=>this.setState({activeDay: e})} clickNumberHandler={this.clickNumberHandler} />
                    {
                        this.state.loading ? <Loader active={true} inline='centered'/> :

                            <div className="mt-4">
                                <Tab menu={{secondary: true}} panes={[
                                    {
                                        menuItem: t('traineeModal.exercises'),
                                        render: () =>
                                            <Tab.Pane attached={false}>
                                                <ExerciseComponent daysNumber={daysNumber}
                                                    getTemplateForDay2={(e) => this.props.getTemplateForDay(templateId, this.state.activeDay)}
                                                    openDetailsExceriseFunction={(e) => this.setState({
                                                        ExceriseDataItem: e,
                                                        openExceriseDetails: true
                                                    })} exerciseMealData={exerciseMealForThisDay}
                                                    templateId={templateId} activeDay={activeDay}/>
                                            </Tab.Pane>,
                                    },
                                    {
                                        menuItem: t('traineeModal.meals'),
                                        render: () => <Tab.Pane attached={false}>
                                            <MealComponent  daysNumber={daysNumber}
                                                getTemplateForDay2={(e) => this.props.getTemplateForDay(templateId, this.state.activeDay)}
                                                openDetailsFunction={(e) => this.setState({
                                                    mealDataItem: e,
                                                    openDetails: true
                                                })} activeDay={activeDay} exerciseMealData={exerciseMealForThisDay}
                                                templateId={templateId}/>
                                        </Tab.Pane>,
                                    },
                                ]}/>
                            </div>
                    }
                </div>

                {!openDetails?
                     '':
                    <MealItemComponent getTemplateForDay2={(e)=> this.props.getTemplateForDay(templateId,this.state.activeDay)} parentCall={(e)=> this.setState({openDetails: e})} openDetails={openDetails} mealDataItem={mealDataItem}  mealTitle={mealDataItem.meal.title}  />
                }
                {!openExceriseDetails?
                     '':
                    <ExceriseItemComponent parentCallExcersise={(e)=> this.setState({openExceriseDetails: e})} ExceriseDataItem={ExceriseDataItem} openExceriseDetails={openExceriseDetails} getTemplateForDay2={(e)=> this.props.getTemplateForDay(templateId,this.state.activeDay)} />
                }
                </>
        );
    }
}

export default withTranslation('translation') (ExerciseMealTemplateComponent);