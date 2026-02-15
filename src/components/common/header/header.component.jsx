import React from 'react';
import  './header.component.css';
import InputTextComponent from "../../InputTextComponent/input-text.component";
import {withTranslation} from "react-i18next";
import { FiSearch } from "react-icons/fi";
import NotificationComponent from "../notification/notification.component";
import HeaderUserProfileComponent from "../header-user-profile/header-user-profile.component";
import ChangeLanguageComponent from "../change-language/change-language.component";
import AccountService from "../../../services/account-service/account.service";

class HeaderComponent extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            username : null
        }
    }
    componentWillMount() {
        const accountService = new AccountService();
        const userData = JSON.parse( accountService.userData);
        if(userData) {
            this.setState({username: userData.full_name})
        }
    }

    render() {
        const {t} = this.props;
        const isArabic = t('local') === 'ar';
        return (
          <div className="header-app container" >
              <div className="row align-items-center">
                  <div className="col-md-6">
                     <div className="row">

                         <div className="col-sm-10">
                             <div className="form-group search-container">
                                 <input type="text"
                                        className="form-control"
                                        placeholder={t('header.searchTitle')}/>
                                 <div className="icon" style={{right:isArabic? 'auto' : '10px' , left:isArabic ? '10px' : 'auto'}}>
                                     <FiSearch />
                                 </div>
                             </div>


                         </div>
                         <div className="col-sm-2">
                           {/* NOTIFICATION*/}
                           <NotificationComponent />
                         </div>

                     </div>
                  </div>
                  <div className="col-md-1">
                      <div className="vertical-Separate">

                      </div>
                  </div>
                  <div className="col-md-3">
                     <HeaderUserProfileComponent username={this.state.username} t={t} />
                  </div>
                  <div className="col-md-2">
                      <ChangeLanguageComponent />
                  </div>
              </div>
          </div>
        );
    }
}

export default withTranslation("translation")( HeaderComponent);