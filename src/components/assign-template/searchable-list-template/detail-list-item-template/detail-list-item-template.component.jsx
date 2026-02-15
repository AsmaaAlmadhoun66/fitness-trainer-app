import React, {Component} from "react";
import {withTranslation} from "react-i18next";
import './detail-list-item-template.component.css';
import {Input, Label} from "semantic-ui-react";
import UserService from "../../../../services/user-service/user.service";
import MealServices from "../../../../services/meal-services/meal.services";

class DetailListItemTemplateComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayedData: this.props.list,
            ratio : 1,
            imgDefaultPath: '',
            food_quantity: '',
            template_day_meal_id: this.props.mealDataItem.template_day_meal_id,
            food_id: this.props.MealForThisDay.id,

        }
    }
    onChangeGram = e => {
        if(!e)
            return;
        e.preventDefault();
        const value = e.target.value;
        let oldValue = this.props.quantity;
        if (value !== ''){
            this.prepareTotalDataSource(oldValue,value);
            this.setState({food_quantity: value})
        }
        else{
            this.prepareTotalDataSource(oldValue,oldValue);
            this.setState({food_quantity: oldValue})
        }
    }
    componentWillMount() {
        const userService = new UserService();
        this.setState({imgDefaultPath : userService.imageDefaultPath })
    }
    async addFood() {
        const {food_quantity, template_day_meal_id, food_id} = this.state;
        const mealServices = new MealServices();
        const data = {
            'template_day_meal_id': template_day_meal_id,
            'food_id': food_id,
            'food_quantity': food_quantity
        }
        mealServices.addFood(data).then(response => {
            if (response.status) {
                //      toast.done(t('shared.success.addedSuccess'));
                 this.props.getTemplateForDay2();
                 this.props.closeModal();
            } else {
                //  toast.done(t('shared.success.addedSuccess'));
            }
        })
    }

    prepareTotalDataSource(oldQty,newQty){
        let NewRatio = parseFloat(newQty) / parseFloat(oldQty)
        if(NewRatio.isNaN) {
            return
        }
        this.setState({
            ratio : NewRatio
        });
    }

    render () {
        const {t} = this.props;
        return (
            <div className={t('local')==='ar' ? 'text-right' : ''}>
                <div className="row detail-list">
                    <div className="col-sm-12 text-center">
                        <img width='100%' src={this.state.imgDefaultPath+this.props.image} alt="image"/>
                        <h3 className='my-4'>{this.props.title}</h3>
                    </div>
                    <div className="col-sm-6 text-center">
                        <div>
                            <div className="key mb-2"> {t('traineeModal.calories')}</div>
                            <Label className='p-3' size='medium'> {((parseFloat(this.props.calories)) * this.state.ratio).toFixed(2)}  </Label>
                        </div>
                        <div>
                            <div className="key mb-2"> {t('traineeModal.fat')}</div>
                            <Label className='p-3' size='medium'> {((parseFloat(this.props.fat)) * this.state.ratio).toFixed(2)} </Label>
                        </div>
                    </div>
                    <div className="col-sm-6 text-center">
                        <div>
                            <div className="key mb-2"> {t('traineeModal.carbs')}</div>
                            <Label className='p-3' size='medium'> {((parseFloat(this.props.carbs)) * this.state.ratio).toFixed(2)} </Label>
                        </div>
                        <div>
                            <div className="key mb-2"> {t('traineeModal.protein')}</div>
                            <Label className='p-3' size='medium'> {((parseFloat(this.props.protein)) * this.state.ratio).toFixed(2)} </Label>
                        </div>
                    </div>
                    <div className="col-sm-12 text-center">
                        <div>
                            <Input type="text" onChange={this.onChangeGram} placeholder={t('templatePage.numberOf')} required/>
                            <span>{t('traineeModal.gram')}</span>
                        </div>
                    </div>
                    <div className='text-center w-100 mt-4'>
                        <button className="btn btn-secondary w-50" onClick={(e)=> this.addFood()}>
                            {t('templatePage.addFood')}
                        </button>
                    </div>

                </div>
            </div>
        )
    }
}
export default withTranslation('translation')( DetailListItemTemplateComponent);
