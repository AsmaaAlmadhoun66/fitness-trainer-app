import React, {Component} from 'react';
import './add-days-template.component.css';
import Slider  from "react-slick";
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css";
import DateComponent from "../../trainee-modal/dates-components/date.component";
import PropTypes from 'prop-types';
import TemplateServices from "../../../services/template-service/template.service";
import {toast} from "react-toastify";
class AddDaysTemplateComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            daysNumber :this.props.exerciseMealData.days,
            activeNumber : 1
        }
        this.sliderRef = React.createRef();
    }

    componentDidMount() {
        const {exerciseMealData} = this.props;
        if(exerciseMealData.days) {
            this.setState({daysNumber: exerciseMealData.days})
        }
    }

    renderDaysButtons = ()  => {
        let daysButton = [];

        for (let i = 1; i <= this.state.daysNumber ; i++) {
            daysButton.push(
                <span number={i} className={i === 1 ? 'active' : ''}>
                    {i}
               </span>
            )
        }


        return daysButton;
    }

    incrementDays = () => {
        let {daysNumber} = this.state;
        if(daysNumber < 30) {
            daysNumber++;
            this.setState({daysNumber});
            this.renderDaysButtons();
            this.props.getTemplateForDay2();
            this.sliderRef.slickGoTo(daysNumber)
            this.addTemplateDay();
        }

    }
    removeTemplateDay = () =>{
        const {exerciseMealData}= this.props;
        const templateServices = new TemplateServices();
        const data = {
            'template_day': exerciseMealData.day.id
        }
        templateServices.removeTemplateDay(data).then(response => {

        })
    }
    addTemplateDay = () =>{
        const {exerciseMealData}= this.props;
        const templateServices = new TemplateServices();
        const data = {
            'template': exerciseMealData.id
        }
        templateServices.addTemplateDay(data).then(response => {

        })
    }

    decrementDays = () => {
        let {daysNumber} = this.state;
        if(daysNumber > 0){
            daysNumber--;
            this.setState({daysNumber});
            this.renderDaysButtons();
            this.props.getTemplateForDay2();
            this.sliderRef.slickGoTo(daysNumber)
            this.removeTemplateDay()
        }
    }

    render() {
        const buttons = this.renderDaysButtons();
        const settings = {
            dots: false,
            infinite: false,
            speed: 400,
            slidesToShow: 10,
            slidesToScroll: 1,
            rtl: false,
            draggable:true,
            lazyLoad: true
        };
        return (
            <div className="add-days-template">
                <div className="d-flex justify-content-center mb-4">
                    <div
                        onClick={this.incrementDays}
                        className="increment-btn"  style={buttonStyle}>
                        +
                    </div>
                    <Slider ref={slider => {
                        this.sliderRef = slider
                    }} {...settings}>
                        {buttons && buttons.length > 0 && buttons.map( (item,key)  => {
                            return (

                                <div key={key}
                                     onClick={ (e) =>  {
                                         const number = item.props.number;
                                         this.setState({activeNumber : number})
                                         const {clickNumberHandler}  = this.props;
                                         if(clickNumberHandler) {
                                             clickNumberHandler(number);
                                         }
                                         this.props.parentCallback(number);
                                     }}
                                     className={this.state.activeNumber === item.props.number ? 'item-num active':'item-num'}>
                                    {item}
                                </div>
                            );
                        })}
                    </Slider>
                    <div className="decrement-btn"
                         onClick={this.decrementDays}
                         style={buttonStyle}>
                        -
                    </div>
                </div>


            </div>
        );
    }
}

const buttonStyle = {padding:'5px',
    width:'50px',
    height:'50px',
    backgroundColor:'#f3f5f6' ,
    margin:'0 5px',
    display:'flex',
    fontSize:'14px',
    borderRadius:'8px',
    justifyContent:'center',
    alignItems:'center'
}


AddDaysTemplateComponent.propTypes = {
    daysNumber : PropTypes.number.isRequired,
    clickNumberHandler : PropTypes.func.isRequired
}

export default AddDaysTemplateComponent;