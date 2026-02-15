import React, {Component} from 'react';
import {withTranslation} from "react-i18next";
import './meal-excerise-item.component.css'
import {FiPlus} from "react-icons/fi";
import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io";
import {BiCopy, BiEditAlt} from "react-icons/bi";
import SearchableListWithImgTemplateComponent
    from "../assign-template/searchable-list-template/searchable-list-withImg-template.component";
import ModalComponent from "../common/modal/modal.component";
import ResourcesService from "../../services/trainee-service/resources.service";

class MealItemComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openDetails2: true,
            __addModal__: false,
            FoodList: []
        }
    }
    async componentWillMount() {
        const mealService  = new ResourcesService();
        this.setState({isLoading : true})
        mealService.food.then(data => {
            this.setState({isLoading : false})
            if(data && data.status) {
                this.setState({FoodList : data.result})
            }
        }).catch(error => {
            this.setState({isLoading : false})
        });

    }
    render() {
        const {t, openDetails, mealTitle } = this.props;
        let {mealDataItem} = this.props;
        let { imgPath} = this.props;
        if(!imgPath)
            imgPath = 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' ;
        return (
            <>
                <div className={["container" , openDetails ? '' : ' d-none']}>
                    <button className='ui button icon primary p-1 mb-3' onClick={(e)=> this.props.parentCall(false)}>
                        {t('local') === 'ar'?  <i><IoIosArrowForward/> </i>: <i><IoIosArrowBack/></i> }

                    </button>
                    <div className="row">
                        <div className="col-sm-12 mb-3 img-thumbnail">
                            <div className="images">
                                {
                                    (mealDataItem.meal.foods) ? mealDataItem.meal.foods.map(item =>
                                        <span>
                                            <img className='w-25' src={'https://testing.miranapp.com/media/'+item.image} alt="image" />
                                        </span>
                                    ) : ''
                                }
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div>
                                <label className='primary'> {t('traineeModal.calories')} : </label>
                                <span>{mealDataItem.nutrition_info.calories}</span>
                            </div>
                            <div>
                                <label className='primary'> {t('traineeModal.fat')} : </label>
                                <span>{mealDataItem.nutrition_info.fat}</span>
                            </div>
                        </div>
                        <div className="col-sm-4 text-center">
                            <h3>{mealTitle}</h3>
                            <h3>{t('templatePage.comments')}</h3>
                        </div>
                        <div className="col-sm-4">
                            <div>
                                <label className='primary'> {t('traineeModal.carbs')} : </label>
                                <span>{mealDataItem.nutrition_info.carbs}</span>
                            </div>
                           <div>
                               <label className='primary'> {t('traineeModal.protein')} : </label>
                               <span>{mealDataItem.nutrition_info.protein}</span>
                           </div>
                        </div>
                        <div className="col-sm-12">
                            <textarea value={mealDataItem.comment} rows='4' className='bg-light w-100 my-4 form-control'/>
                        </div>
                    </div>
                    <div className="meal-buttons text-left">
                        <button onClick={e => {
                            e.preventDefault();
                            this.setState({__addModal__: true});
                        }} className="ui button icon primary p-1">
                            <FiPlus />
                            <div className='f-1-half'>{t('templatePage.addFood')}</div>
                        </button>
                        <button className="ui button icon py-1">
                            <BiCopy />
                            <div className='f-1-half'>{t('traineeModal.copyMeal')}</div>
                        </button>
                        <button className="ui button icon py-1">
                            <BiEditAlt />
                            <div className='f-1-half'>{t('shared.edit')}</div>
                        </button>
                    </div>
                </div>

                <ModalComponent  size='tiny' isOpen={this.state.__addModal__}  hideAction={true} handleClosed={(e)=>this.setState({__addModal__: false})} >
                    <SearchableListWithImgTemplateComponent getTemplateForDay2={this.props.getTemplateForDay2} mealDataItem={this.props.mealDataItem} list={this.state.FoodList}/>
                </ModalComponent>

            </>
        );
    }
}

export default withTranslation('translation')( MealItemComponent);