import React, {Component} from 'react';
import './profile.component.css';
import BreadcrumbComponent from "../../components/common/breadcrumb/breadcrumb.component";
import {withTranslation} from "react-i18next";
import maleProfileDefault from '../../assets/icons/user-profile.jpg';
import femaleProfileDefault from '../../assets/images/femaleImage.jpg';
import UserService from "../../services/user-service/user.service";
import {Loader, Menu} from "semantic-ui-react";
import { FiPlus } from "react-icons/fi";
import { RiArrowRightFill, RiArrowLeftFill } from "react-icons/ri";
import InputTextComponent from "../../components/InputTextComponent/input-text.component";
import EmailInputComponent from "../../components/EmailComponent/email-input.component";
import { Select } from 'semantic-ui-react'
import PrimaryButtonComponent from "../../components/ButtonComponent/primary-button.component";
import {toast, ToastContainer} from "react-toastify";
import { withRouter } from "react-router-dom";


class ProfileComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            loading:false,
            imgDefaultPath : null,
            previewImage : null,
            imageProfile: null
        }
    }

    componentWillMount() {
        // Fetch user profile.
        const userService = new UserService();
        this.setState({loading:true ,imgDefaultPath : userService.imageDefaultPath })
        userService.profile.then(data => {
            // Todo Handle the data before log it.
            this.setState({loading:false })
            if(data.status) {
                this.setState({data : data.result})
            }
        }).catch(error => {
            this.setState({loading:false})
            console.log(error);
        })
    }


    previewImage = (file) => {
        debugger;
        if(file) {

            // const fileExtensionsAllowed = ["image/jpeg" , "image/jpg" , "image/png"]
            if (!file.name.match(/.(jpg|jpeg|png|gif)$/i))
            {
                const {t}  = this.props;
                const isArabic = t('local') === 'ar';
                toast.warn(isArabic ? 'من فضلك اختر صورة' : 'Please choose an image');
                return ;
            }
            const reader = new FileReader();
            reader.onload = () => {
                this.setState({previewImage: reader.result} , () => {
                    console.log("state after choose image = " , this.state);
                })
            }
            reader.readAsDataURL(file);
        }
    }

    render() {
        const {t} = this.props;
        let imgPath = this.state.data &&  this.state.imgDefaultPath ? this.state.imgDefaultPath + this.state.data.profile.avatar :
            this.state.data && this.state.data.profile && this.state.data.profile.gender && this.state.data.profile.gender.name === 'female'? femaleProfileDefault :
            maleProfileDefault;

        if(this.state.previewImage) {
            imgPath = this.state.previewImage;
        }
        return (

            <div className="container user-profile">
                {
                    this.state.loading ?
                        <div className="row">
                            <div className="col-sm-12">
                                <Loader active={true} inline='centered' />
                            </div>
                        </div> :
                        <>
                            <div className="row">

                                <div className="col-sm-12">
                                    <BreadcrumbComponent title={t('breadcrumb.profile')} />
                                </div>
                            </div>
                            <div className="row mt-4">
                               <div className="col-sm-10  m-auto">
                                   <div className="row mt-4">
                                       <div className="col-md-2 col-sm-12 text-sm-center">
                                           {/*  TODO: User Image  */}
                                           <div className="user-img-container">
                                               <div className="user-img">
                                                   <img  src={imgPath} alt={"user image"}/>
                                               </div>
                                               <div className="icon" onClick={e => {
                                                   const profileImgInput = document.getElementById('profileImg');
                                                   profileImgInput.click();
                                               }} >
                                                   <input type="file" onChange={e => {
                                                       this.previewImage(e.target.files[0]);
                                                   }} id="profileImg" hidden/>
                                                   <FiPlus />
                                               </div>
                                           </div>
                                       </div>
                                       <div className="col-md-10 col-sm-12">
                                           <div className="row">
                                               <div className="col-sm-12">
                                                   <InputTextComponent value={this.state.data && this.state.data.profile.full_name}  isRequired={false}  labelTitle={t('profile.fullName')} />
                                               </div>
                                               <div className="col-sm-12 mt-2">
                                                   <EmailInputComponent isRequired={false} value={this.state.data && this.state.data.profile.email} isArabic={t('local') === 'ar'} />
                                               </div>
                                               <div className="col-sm-12 mt-2">
                                                   <InputTextComponent isRequired={false} labelTitle={t('profile.tele')} value={this.state.data && this.state.data.profile.mobile.replace(/\s+/g, '').replace('+','')} />
                                               </div>
                                               <div className="col-sm-6 mt-2">
                                                   <label >
                                                       {t('profile.gender')}
                                                   </label>
                                                   <div >
                                                       <Select style={{textAlign:t('local')==='ar' ? 'right' : 'left'}}
                                                               fluid placeholder='Select your Gender'
                                                                value={this.state.data && this.state.data.profile.gender.name}
                                                               onChange={ (e , v)=> {
                                                                   console.log(v);
                                                                   const _data = this.state.data;
                                                                   _data.profile.gender.name = v.value;
                                                                   this.setState( {_data})
                                                               }}
                                                               options={[{key: 'male' , value:'male' , text:t('local') === 'ar' ? 'ذكر' :  'male'} , {key: 'female' , value:'female' , text:t('local') === 'ar' ? 'أنثى' :'female'}]} />
                                                   </div>
                                               </div>
                                               <div className="col-sm-6 mt-2">
                                                   <InputTextComponent
                                                        value={this.state.data && this.state.data.profile && this.state.data.profile.nationality ?
                                                     t('local') === 'ar' ? this.state.data.profile.nationality.name_ar : this.state.data.profile.nationality.name  : null
                                                        }
                                                        isRequired={false} labelTitle={t('profile.country')} />
                                               </div>
                                               <div className="col-sm-12 mt-2">
                                                   <label >
                                                       {t('register.languages')}
                                                   </label>
                                                   <div>
                                                       {this.state.data && this.state.data.profile ? this.state.data.profile.languages.map((item) =>
                                                           <>
                                                               <button className='btn-secondary d-inline-block w-25 mx-1'>{t('local') === 'ar' ? item.title_ar: item.title}</button>
                                                           </>

                                                       ): '' }
                                                   </div>

                                               </div>
                                               <div className="col-sm-12 mt-2">
                                                   <label >
                                                       {t('profile.aboutMe')}
                                                   </label>
                                                   <textarea  className="form-control" rows={5} value={this.state.data && this.state.data.profile.bio}/>
                                               </div>
                                               <div className="col-sm-12 mt-2">
                                                   <label >
                                                       {t('faqPage.faq')}
                                                   </label>

                                                   <button className='ui icon button bg-white d-block px-4 py-1'
                                                           onClick={e => {
                                                                this.props.history.push('/faq')}
                                                           }>
                                                       { t('local') === 'ar' ?  <font size="+2"><RiArrowLeftFill/></font>: <font size="+2"><RiArrowRightFill/></font>}
                                                   </button>
                                               </div>
                                               <div className="col-sm-12 mt-4 ">
                                                   <PrimaryButtonComponent title={t('shared.update')} />
                                               </div>
                                           </div>
                                       </div>
                                   </div>
                               </div>
                            </div>
                        <ToastContainer />
                        </>
                }

            </div>
        );
    }
}

export default  withTranslation('translation')(withRouter(ProfileComponent));