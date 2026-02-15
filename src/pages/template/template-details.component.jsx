import React, {Component} from 'react';
import './template.component.css';
import {withTranslation} from "react-i18next";
import {Loader, Menu, Tab} from 'semantic-ui-react';
import AddDaysTemplateComponent from "../../components/assign-template/add-days-template/add-days-template.component";
import ExerciseMealTemplateComponent
    from "../../components/assign-template/exercise-meal-template/exercise-meal-template.component";
import {BsThreeDotsVertical} from "react-icons/bs";
import TemplateService from "../../services/template-service/template.service";
import TemplateCardComponent from "../../components/template-card/template-card.component";
import EmptyComponent from "../../components/common/empty-page/empty.component";
import ToasterComponent from "../../components/common/toaster/toaster.component";
import TemplateServices from "../../services/template-service/template.service";
import {toast} from "react-toastify";

class TemplateDetailsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            templateId : null,
            data: [],
            activeDay: 1,
            fullTemplateDataForThisDay: [],
            exerciseMealForThisDay: [],
            activeIndex: '',
            loader: true
        }
    }

    getTemplateForDay = (Id,activeDay) =>{
        const {t} = this.props;
        if(activeDay === undefined){
            activeDay = this.state.activeDay;
        }
        const templateServices = new TemplateServices();
        templateServices.getTemplateForDay(Id, activeDay).then(response => {
            if (response) {
                this.setState({exerciseMealForThisDay :response.result, loader : false  });
            }
        })
    }
    componentWillMount() {
        const dataFromLocation = this.props.location.state;
         this.setState({data: dataFromLocation.data, templateId: dataFromLocation.templateId});
    }
    componentDidMount() {
        const templateId = this.state.templateId;
        this.getTemplateForDay(templateId);
    }

    render() {
        const {t } = this.props;
        const panes = this.state.data.length > 0 ? this.state.data.map(item =>({
            menuItem:
                <Menu.Item key={item.id}  onClick={(e)=>this.getTemplateForDay(item.id)}>
                    <a className='row'>
                        <div className="col-8"> {item.name}</div>
                        <div className="col-4 text-left"><BsThreeDotsVertical/></div>
                    </a>
                </Menu.Item>,
            render: () =>
                <Tab.Pane attached={false}>
                    {
                        this.state.loader ? <Loader active={true} inline='centered'/> :
                            <ExerciseMealTemplateComponent exerciseMealForThisDay={this.state.exerciseMealForThisDay}
                                                           parentCallback={(e) => this.setState({activeDay: e})}
                                                           getTemplateForDay={this.getTemplateForDay}
                                                           daysNumber={item.days} ref="child" templateId={item.id}
                                                           activeDay={this.state.activeDay}/>
                    }
                </Tab.Pane>
        })): '';

        return (
            <>
                <div className="container">
                    <Tab menu={{ fluid: true, vertical: true, tabular: 'left' }} panes={panes}
                         activeTab={this.state.templateId}  onTabChange={this.handleTabChange}
                    />
                </div>
                <ToasterComponent />
            </>
        );
    }
}

export default withTranslation('translation') (TemplateDetailsComponent);