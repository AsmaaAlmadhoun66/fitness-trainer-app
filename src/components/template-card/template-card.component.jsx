import React, {Component} from 'react';
import PenWriteIco from '../../assets/icons/pen_write.svg';
import PropTypes from 'prop-types';
import {withTranslation} from "react-i18next";
import  './template-card.component.css';
import { withRouter} from "react-router-dom";
import { FiX } from "react-icons/fi";
import ModalComponent from "../common/modal/modal.component";
import TraineeCardComponent from '../trainee-card-component/trainee-card.component';
import {Loader} from "semantic-ui-react";
import EmptyComponent from "../common/empty-page/empty.component";
import UserService from "../../services/user-service/user.service";

class TemplateCardComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            __addModal__: false,
            id: this.props.id,
            traineeList: []
        }
    }
    showModalHandler =(e) => {
        e.stopPropagation();
        this.setState({__addModal__ : true});
    }
    closeModalHandler = () =>  {
        this.setState({__addModal__ : false});
    }

    componentWillMount() {
        this.fetchData();
    }

    fetchData = () => {
        const userService = new UserService();
        this.setState({loading:true})
        userService.traineeList.then(data => {
            this.setState({loading:false})
            if(data) {
                this.setState({traineeList : data.result})
            }
        }).catch(error => {
            this.setState({loading:false})
            console.log(error);
        })
    }

    render() {
        const {t, data} = this.props;
        return (
            <>
            <a className="template-card" onClick={e => {
                const {openAssignModal , id} = this.props;
                this.props.history.push({
                    pathname: '/template-details',
                    state: { templateId: id, data: data },
                });
            }}>
               <div className="content">
                   <div className="ico">
                       <img src={PenWriteIco} alt="icon"  />
                   </div>
                   <div className="temp-name">
                       <span> {this.props.tempName} </span>
                   </div>
                   <div className="action">
                       <button className="btn" onClick={e => {
                           const {openAssignModal , id} = this.props;
                           e.preventDefault();
                           this.showModalHandler(e);
                       }} style={{borderRadius:'50px'}}>
                           {t('templatePage.assign')}
                       </button>
                   </div>
               </div>
                <div className="delete-icon" onClick={e => {
                    e.stopPropagation();
                    const {deleteFn , id} = this.props;
                    if(deleteFn) {
                        deleteFn(id);
                    }
                }}>
                    <span> <FiX /> </span>
                </div>
            </a>
                <ModalComponent size="tiny" handleClosed={this.closeModalHandler}  isOpen={this.state.__addModal__}
                    Actions={
                        <div className="text-center">
                            <button className="btn-secondary w-50">
                                {t('templatePage.assign')}
                            </button>
                        </div>
                    }>
                    <div className="mb-4">
                        <div className="text-center">
                            <div className='modal-title'> {t('templatePage.chooseTrainee')}</div>
                            <h4 className='text-primary text-center mt-5 mb-3'>{t('templatePage.date')}</h4>
                            <div className='text-center'> <span className='modal-title-date'>09/02/2021</span></div>
                        </div>
                    </div>
                    <hr/>
                    {
                        this.state.loading ?  <Loader active={true} inline='centered' /> :
                            this.state.traineeList && this.state.traineeList.length > 0 ?  this.state.traineeList.map( (item , i) => {
                                const _imgPath = item.profile && item.profile.avatar ? 'https://testing.miranapp.com/media/' +  item.profile.avatar : 'https://www.w3schools.com/howto/img_avatar.png'
                                return (
                                        <TraineeCardComponent key={i} full_name={item.full_name} imgPath={_imgPath} className='card-custom' classNameAction='d-none' />
                                );
                            } ) : <EmptyComponent />
                    }
                </ModalComponent>
            </>
        );
    }
}

TemplateCardComponent.propTypes = {
    id:PropTypes.number.isRequired,
    tempName : PropTypes.string.isRequired,
    deleteFn: PropTypes.func,
    openAssignModal : PropTypes.func.isRequired,
    data : PropTypes.array,
}

export default withTranslation('translation') (withRouter(TemplateCardComponent));