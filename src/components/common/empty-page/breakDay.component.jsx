import React, {Component} from 'react';
import EmptyPage from "../../../assets/icons/breakDay.png";
import {FaGlassMartiniAlt} from 'react-icons/fa';
import './empty.css'
import {withTranslation} from "react-i18next";

class BreakDayComponent extends Component {

    render() {
        const {t}= this.props;
        return (
            <div className="text-center mt-4" style={{width:'100%'}}>
                <img src={EmptyPage} alt="empty" className='w-50'/>
                <i className='centerIcon'>
                    <FaGlassMartiniAlt/>
                    <span className='text-white'>{t('shared.breakday')}</span>
                </i>
            </div>
        );
    }
}

export default withTranslation('translation') (BreakDayComponent);