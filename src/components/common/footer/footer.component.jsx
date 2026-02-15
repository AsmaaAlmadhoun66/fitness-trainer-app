import React, {Component} from 'react';
import {withTranslation} from "react-i18next";

class FooterComponent extends Component {

    render() {
        const { t } = this.props;
        const isArabic = this.props.i18n.language === 'ar';
        return (
           <div className="container">
               <div className="row">
                   <div className="col-sm-12 my-4">
                       <div className="text-center">
                           {isArabic ? 'جميع الحقوق محفوظة ' : 'All rights reserved '}
                       </div>
                   </div>
               </div>
           </div>
        );
    }
}

export default withTranslation("translation") (FooterComponent);