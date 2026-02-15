import React, {Component} from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {withTranslation} from "react-i18next";
class ToasterComponent extends Component {
    render() {
        const {t} = this.props;
        const isArabic = this.props.i18n.language === 'ar';
        return (
            <ToastContainer
                position={isArabic ? 'bottom-right' : 'bottom-left'}
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={isArabic}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            >

            </ToastContainer>
        );
    }
}

export default withTranslation("translation") (ToasterComponent);