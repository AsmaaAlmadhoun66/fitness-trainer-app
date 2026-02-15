import React, {Component} from 'react';
import defaultProfile from '../../../assets/images/profile-default-01-01.svg';
import './header-user-profile.component.css';
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

class HeaderUserProfileComponent extends Component {
    render() {
        let {imgPath ,t} = this.props;
        const isArabic = t('local') === 'ar';
        if(!imgPath)
            imgPath = defaultProfile;
        return (
            <>
             <div className="profile-data">
                 <div className="user-img" >
                     <img src={imgPath}   alt="profile"/>
                 </div>
                 <div className="user-data" style={{marginRight:isArabic ? '10px' : 0 , marginLeft: isArabic ? 0 : '10px'}}>
                     <span> {t('header.trainer')} </span>
                     <div className="name">
                         <Link to={'/profile'} >
                             {this.props.username.length > 15 ? this.props.username.substr(0,15) + '...':this.props.username}
                         </Link>
                     </div>
                 </div>

             </div>
            </>
        );
    }
}
HeaderUserProfileComponent.propTypes = {
    username : PropTypes.string.isRequired,
    imgPath: PropTypes.string
}
export default HeaderUserProfileComponent;