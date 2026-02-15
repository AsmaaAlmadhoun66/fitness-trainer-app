import React, {Component} from 'react';
import './confirm-alert.component.css';
import ConfirmImg from '../../assets/images/Puzzle-01.svg';
import {withTranslation} from "react-i18next";
import Lottie from 'react-lottie';
import animationData from '../../assets/lotties/alert.json';
const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
    }
};
class ConfirmAlertComponent extends Component {
    render() {
        const {t} = this.props;
        const isArabic = t('local') === "ar" ;
        return (
            <div className="confirm-alert">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 mt-4 d-flex  align-items-center justify-content-center ">
                             <div >
                                 <div className="img-content text-center">
                                     <Lottie
                                         options={defaultOptions}
                                         height={500}
                                         width={500}
                                     />
                                 </div>
                                 <div className="col-sm-12 text-center mt-4">
                                     <div style={{ borderRadius:'8px' , padding:'15px'}} className="alert alert-danger  alert-dismissible fade show" role="alert">
                                         <h5> {isArabic ? "الحساب الخاص بك غير مفعل" : "Your account not active"} </h5>
                                     </div>
                                 </div>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withTranslation("translation")(ConfirmAlertComponent);