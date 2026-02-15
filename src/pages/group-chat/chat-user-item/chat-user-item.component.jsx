import React, {Component} from 'react';
import './chat-user-item.css';
import PropTypes from 'prop-types';
import {withTranslation} from "react-i18next";
import defaultUserImage from '../../../assets/icons/user-profile.jpg';
class ChatUserItemComponent extends Component {
    render() {
        const {t} = this.props;
        let {avatarImg} = this.props;
        if(!avatarImg ) {
            avatarImg = defaultUserImage;
        }
        const isArabic = t('local') === 'ar';
        return (
            <div className="chat-user-item-card">
                <div className="user-avatar">
                    <img src={avatarImg} alt="user-img" />
                </div>
                <div className="user-info">
                    <strong> {this.props.username} </strong>
                   {this.props.isOnline ? <span className="online"> {isArabic? 'متاح'  :'Online'} </span> : <span className="offline"> {isArabic ? 'غير' +
                       ' متاح' : 'Offline'} </span>}
                </div>
                {
                    this.props.msgUnReadCount ?
                        <div className="unread-msg">
                            <div className="time">
                                {this.props.msgUnReadTime}
                            </div>
                            <div className="count">
                                {this.props.msgUnReadCount}
                            </div>
                        </div>
                        : null
                }
            </div>
        );
    }
}

ChatUserItemComponent.propTypes = {
    avatarImg : PropTypes.string,
    username : PropTypes.string.isRequired ,
    isOnline : PropTypes.bool,
    msgUnReadCount : PropTypes.number,
    msgUnReadTime : PropTypes.string
}

export default withTranslation('translation') (ChatUserItemComponent);