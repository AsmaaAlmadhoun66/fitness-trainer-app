import React, {Component} from "react";
import { Input } from 'semantic-ui-react'
import {withTranslation} from "react-i18next";
import './searchable-list-template.component.css';
import ModalComponent from "../../common/modal/modal.component";
import DetailListItemTemplateComponent from "./detail-list-item-template/detail-list-item-template.component";
import UserService from "../../../services/user-service/user.service";
import AddExerciseTemplateComponent from "../add-exercise-template/add-exercise-template.component";
import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io";

class ListItemWithImg extends Component{
    constructor(props) {
        super(props);
        this.state = {
            __addModal__ : false,
            isLoading: false,
            FoodList : [],
            imgDefaultPath: ''
        }
    }
    componentWillMount() {
        const userService = new UserService();
        this.setState({imgDefaultPath : userService.imageDefaultPath })
    }

    showModalHandler =() => {
        this.setState({__addModal__ : true});
    }
    closeModalHandler = () =>  {
        this.setState({__addModal__ : false});
    }
    render () {
        const {t, activeDay, ExerciseId} = this.props;
        return (
            <>
                <li>
                    <a href="#" className='item' onClick= {() => this.showModalHandler()}>
                        <span>
                            <img src={this.state.imgDefaultPath+this.props.image} alt="img"/>
                        </span>
                            <span>{this.props.name}</span>
                    </a>
                </li>
                <ModalComponent size="tiny" isOpen={this.state.__addModal__} hideAction={true} handleClosed={this.closeModalHandler} >
                    {isNaN(this.props.data.exercise_id) ?
                        <DetailListItemTemplateComponent key={this.props.id} quantity={this.props.quantity} calories={this.props.calories} fat={this.props.fat}   title={this.props.name}
                                                         closeModal={(e)=>this.setState({__addModal__ : false})}           mealDataItem={this.props.mealDataItem}   getTemplateForDay2={(e)=>{this.props.getTemplateForDay2(e)}}      image={this.props.image}  protein={this.props.protein} carbs={this.props.carbs} MealForThisDay={this.props.data}
                        />
                        :
                        <AddExerciseTemplateComponent closeModal={(e)=>this.setState({__addModal__ : false})} getTemplateForDay2={(e)=>{this.props.getTemplateForDay2(e)}} activeDay2={activeDay} ExerciseId2={ExerciseId} exerciseMealForThisDay={this.props.data} />
                    }

                </ModalComponent>
            </>
        )
    }
}

class SearchableListWithImgTemplateComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayedData: this.props.list
        }
    }
    searchHandler = (event) => {
        const {t} = this.props;
        let event2 = event.target.value;
        let displayedData;
        if(event2 !== ''){
            t('local') === 'ar' ?
                displayedData = this.props.list.filter(s => s.title_ar.includes(event2))
                :
                displayedData = this.props.list.filter(s => s.title.includes(event2))
            this.setState({
                displayedData: displayedData
            })
        }
        else {
            this.setState({
                displayedData: this.props.list
            })
        }

    }

    render () {
        const {t, ExerciseId, activeDay, parentCallExcersise} = this.props;
        let List = this.state.displayedData;
        return (
            <div className="SearchableListTemplateComponent-withImg">
                <Input type="text" icon='search' className="search" placeholder={t('traineeModal.searchFor')} onChange={this.searchHandler.bind(this)}/>
                <ul>
                    {
                        List.map((el) => {
                            return <ListItemWithImg key={el.id} onClick={(e)=> this.props.openModalToAdd(t('local')==='ar' ? el.title_ar : el.title)}
                                                    data={el} activeDay={activeDay} ExerciseId={ExerciseId}
                                                    quantity={el.quantity} calories={el.calories} fat={el.fat}
                                                    mealDataItem={this.props.mealDataItem} image={el.image}  protein={el.protein} carbs={el.carbs}
                                                    getTemplateForDay2={(e) => {this.props.getTemplateForDay2(e)} }       name={t('local')==='ar' ? el.title_ar : el.title}
                            />
                        })
                    }
                </ul>
            </div>
        )
    }
}
export default withTranslation('translation')( SearchableListWithImgTemplateComponent );
