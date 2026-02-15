import React, {Component} from 'react';
import PropTypes from "prop-types";

import ModalComponent from "../common/modal/modal.component";
import Report from '../../assets/icons/report-01.svg';
import {withTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import  './trainee-modal.css';
import DateComponent from "./dates-components/date.component";
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Tab } from 'semantic-ui-react'
import ExerciseComponent from "./exercise-component/exercise.component";
import MealComponent from "./meal-component/meal.component";
import MaleProfile from '../../assets/icons/user-profile.jpg';
import { FiX } from "react-icons/fi";

class TraineeModalComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen : false
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const {isOpen} = nextProps;
        this.setState({ isOpen});
    }

    render() {
        const {t  } = this.props;
        const settings = {
            dots: false,
            infinite: false,
            speed: 1000,
            slidesToShow: 7,
            slidesToScroll: 7,
            rtl: false,
            draggable:false,
            lazyLoad: true,
            nextArrow: <SampleNextArrow />,
            prevArrow: <SamplePrevArrow />

        };
        return (
            <div>
                <ModalComponent size="tiny" isOpen={this.state.isOpen} Actions={
                    <div className="card-foot" >
                      <div style={{float:t('local') === 'ar' ? 'right' : 'left' }}>
                         <div className="d-flex">
                             <div className="user-img">
                                 <img src={MaleProfile} alt="user profile"/>
                             </div>
                             <div className="user-info">
                                 <h5> Mostafa Mohamed Ibrahim </h5>
                                 <span> 2 days remaining </span>
                             </div>
                         </div>
                      </div>
                        <div className="actions d-flex align-items-center justify-content-center" style={{float:t('local') === 'ar' ? 'left' : 'right' }}>
                            <div >
                                <button className="btn-primary btn">
                                    {t('shared.save')}
                                </button>
                            </div>
                             <div>
                                 <button className="btn btn-secondary-small-rounded" onClick={(e) =>  {
                                    
                                     this.setState({isOpen: false})
                                 }}>
                                     <FiX />
                                 </button>
                             </div>
                        </div>
                        <div style={{clear:'both'}}>

                        </div>
                    </div>
                 }>
                   <div className="planing-schedule">
                       <div className="heading row">
                           <div className="col-sm-1 d-flex">
                               <img src={Report} alt="icon" width="30px" />
                           </div>
                           <div className="col-sm-11 ">
                               <div className="headings d-flex align-items-center">
                                   <h3 className="text-right flex-grow-1"> {t('traineeModal.title')} </h3>
                                   <Link to={""}>
                                       {t('traineeModal.Calories')}
                                   </Link>
                               </div>
                               <div className="dates">
                                   <Slider {...settings}>
                                       <DateComponent dateNumber={10} dateName={'sun'} />
                                       <DateComponent dateNumber={11} dateName={'sun'} />
                                       <DateComponent dateNumber={12} dateName={'sun'} />
                                       <DateComponent dateNumber={13} isActive={true} dateName={'sun'} />
                                       <DateComponent dateNumber={14} dateName={'sun'} />
                                       <DateComponent dateNumber={15} dateName={'sun'}  />
                                       <DateComponent dateNumber={16} dateName={'sun'} />
                                       <DateComponent dateNumber={17} dateName={'sun'} />
                                       <DateComponent dateNumber={18} dateName={'sun'} />
                                       <DateComponent dateNumber={19} dateName={'sun'} />
                                       <DateComponent dateNumber={20} dateName={'sun'} />
                                       <DateComponent dateNumber={21} dateName={'sun'} />
                                       <DateComponent dateNumber={22} dateName={'sun'} />
                                       <DateComponent dateNumber={23} dateName={'sun'} />
                                       <DateComponent dateNumber={24} dateName={'sun'} />
                                       <DateComponent dateNumber={25} dateName={'sun'} />
                                       <DateComponent dateNumber={26} dateName={'sun'} />
                                       <DateComponent dateNumber={27} dateName={'sun'}  />
                                       <DateComponent dateNumber={28} dateName={'sun'} />
                                       <DateComponent dateNumber={29} dateName={'sun'} />
                                       <DateComponent dateNumber={30} dateName={'sun'} />
                                       <DateComponent dateNumber={31} dateName={'sun'} />
                                       <DateComponent dateNumber={32} dateName={'sun'} />
                                       <DateComponent dateNumber={33} dateName={'sun'} />
                                   </Slider>

                               </div>

                           </div>
                       </div>
                       <div className="row">
                           <div className="col-sm-12">
                               <div className="mt-4">
                                   <Tab menu={{ secondary: true }} panes={ [
                                       {
                                           menuItem:  t('traineeModal.exercises'),
                                           render: () =>
                                               <Tab.Pane attached={false}>
                                                   <ExerciseComponent />
                                                   <ExerciseComponent />
                                               </Tab.Pane>,
                                       },
                                       {
                                           menuItem:  t('traineeModal.meals'),
                                           render: () => <Tab.Pane attached={false}>
                                               <MealComponent calories={128} carbs={16} fat={6} protein={3} meadId={1} mealTitle={"Snack"} images={['https://homepages.cae.wisc.edu/~ece533/images/airplane.png','https://homepages.cae.wisc.edu/~ece533/images/cat.png']} />
                                           </Tab.Pane>,
                                       },
                                   ]} />
                               </div>
                           </div>
                       </div>
                   </div>
                </ModalComponent>
            </div>
        );
    }
}


TraineeModalComponent.propTypes = {
    isOpen : PropTypes.bool
}

export default  withTranslation('translation')(TraineeModalComponent);


function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block"}}
            onClick={onClick}
        />
    );
}

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            onClick={onClick}
        >
            next
        </div>
    );
}