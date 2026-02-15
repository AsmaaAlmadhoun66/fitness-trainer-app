import React, {Component} from 'react';
import SideBarComponent from "../../components/common/side-bar/side-bar.component";
import TraineeCardComponent from "../../components/trainee-card-component/trainee-card.component";
import BreadcrumbComponent from "../../components/common/breadcrumb/breadcrumb.component";
import TraineeService from "../../services/trainee-service/traniee.service";
import {Loader, Tab} from 'semantic-ui-react'
import TraineeModalComponent from "../../components/trainee-modal/trainee-modal.component";
import TraineeModalNoteComponent from "../../components/trainee-modal/trainee-modal-note.component";
import ProfileModalComponent from "../../components/profile-modal/profile-modal.component";
import {withTranslation} from "react-i18next";
import EmptyComponent from "../../components/common/empty-page/empty.component";
import { Card,Button } from 'semantic-ui-react'
import './home.component.css';
import ToasterComponent from "../../components/common/toaster/toaster.component";

class HomeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trainees : [],
            requests : [],
            isLoading : false,
            openModal : false,
            openModalRequest : false,
            modalRequestProfile: false,
            traineesId: 1
        }
    }

    componentWillMount() {
        const traineeService  = new TraineeService();
        this.setState({isLoading : true})
        traineeService.trainees.then(data => {
            this.setState({isLoading : false})
            if(data && data.status) {
                this.setState({trainees : data.result})
            }
        }).catch(error => {
            this.setState({isLoading : false})
        })
        traineeService.requests.then(data => {
            this.setState({isLoading : false})
            if(data && data.status) {
                this.setState({requests : data.result})
            }
        }).catch(error => {
            this.setState({isLoading : false})
        })
    }
    openModalHandler = (traineeId) => {
        this.setState({openModal : true})
    }
    openModalRequestProfile = (id) => {
        this.setState({modalRequestProfile : true, traineesId: id})
    }
    render() {
        const {openModal, openModalRequest, modalRequestProfile} = this.state;
        const {t} = this.props;
        return (
            <>
                <TraineeModalComponent isOpen={openModal} />
                <ProfileModalComponent isOpenProfile={modalRequestProfile}  noteClass={true} profileData={this.state.trainees} traineesId={this.state.traineesId}/>
                <div className="container">

                 <div className="row" style={{marginLeft:0, marginRight:0}}>
                     <div className="col-sm-12">
                         <BreadcrumbComponent title={t('breadcrumb.overview')} />
                         <Tab className='mt-4 tab-custom' menu={{ secondary: true, className: 'w-75 m-auto' }} panes={ [
                             {
                                 menuItem:  t('breadcrumb.overview'),
                                 render: () =>
                                     <Tab.Pane attached={false} className='p-4'>
                                         {
                                             this.state.isLoading ? <div className="col-sm-12 mt-4">
                                                 <Loader active={true} inline='centered' />
                                             </div> : null
                                         }
                                         <div className="row mb-5">

                                         {
                                             this.state.trainees.length >0 ?
                                                 this.state.trainees.map( (item,i) => {
                                                     const _isFemale = item.profile && item.profile.gender && item.profile.gender.name === "female";
                                                     const _remainingTime = item.profile && item.profile.subscription  ? item.profile.subscription.remaining_days : null;
                                                     const _imgPath = item.profile && item.profile.avatar ? 'https://testing.miranapp.com/media/' +  item.profile.avatar : 'https://www.w3schools.com/howto/img_avatar.png'
                                                     return (
                                                         <div className="col-md-3 mt-4" key={i}>
                                                             <TraineeCardComponent
                                                                 modalRequestProfile={this.openModalRequestProfile}
                                                                 traineesId={item.id}
                                                                 openModalFn={this.openModalHandler}
                                                                 isFemale={ _isFemale} imgPath={_imgPath} remainingDays={_remainingTime}  full_name={item.full_name} id={item.id}/>
                                                         </div>
                                                     );
                                                 })
                                                 :
                                                 <EmptyComponent />
                                         }
                                         </div>
                                     </Tab.Pane>,
                             },
                             {
                                 menuItem:  t('request.request'),
                                 render: () =>
                                     <Tab.Pane attached={false} className='p-4'>
                                         {
                                             this.state.isLoading ? <div className="col-sm-12 mt-4">
                                                 <Loader active={true} inline='centered' />
                                             </div> : null
                                         }
                                         <h4>{t('request.newRequest')}</h4>
                                         <div className="row mb-5">
                                         {
                                             this.state.requests.length >0 ?
                                                 this.state.requests.map( (item,i) => {
                                                     const _imgPath = item.profile && item.profile.avatar ? 'https://testing.miranapp.com/media/' +  item.profile.avatar : 'https://www.w3schools.com/howto/img_avatar.png'
                                                     return (
                                                         <div className="col-md-3 mt-4" key={i}>
                                                             <Card
                                                                 image={_imgPath}
                                                                 header='Elliot Baker'
                                                                 className='text-center card-custom'
                                                                 extra={
                                                                     <button className='btn-secondary w-75 m-auto' >
                                                                         {t('request.viewRequest')}
                                                                     </button>
                                                                 }
                                                             />
                                                             <ProfileModalComponent isOpen={openModalRequest} requestClass={true} requestId={item.id}/>
                                                         </div>
                                                     );
                                                 }): ''
                                         }
                                         </div>

                                         <hr/>

                                         <h4>{t('request.invitationsTrainees')}</h4>
                                         <div className="row">
                                             {
                                                 this.state.requests.length >0 ?
                                                     this.state.requests.map( (item,i) => {
                                                         const _imgPath = item.profile && item.profile.avatar ? 'https://testing.miranapp.com/media/' +  item.profile.avatar : 'https://www.w3schools.com/howto/img_avatar.png'
                                                         return (
                                                             <div className="col-md-3 mt-4" key={i}>
                                                                 <Card
                                                                     image={_imgPath}
                                                                     header='Elliot Baker'
                                                                     className='text-center card-custom'
                                                                     extra={
                                                                         <button className='btn-secondary w-75 m-auto' onClick={(e) => {
                                                                             this.setState({openModalRequest:true});
                                                                         }}>
                                                                             {t('request.viewRequest')}
                                                                         </button>
                                                                     }
                                                                 />

                                                             </div>
                                                         );
                                                     })
                                                     :
                                                     <EmptyComponent />
                                             }
                                         </div>
                                     </Tab.Pane>,
                             },
                         ]} />
                     </div>
                 </div>
                 <ToasterComponent />

             </div>
            </>
        );
    }
}

export default withTranslation('translation') (HomeComponent)