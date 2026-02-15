import React, {Component} from 'react';
import {withTranslation} from "react-i18next";
import './progress.component.css';
import waistIcon from '../../assets/icons/waist-diet.svg'
import {Image, Menu} from "semantic-ui-react";
import chatIcon from "../../assets/icons/chat.svg";


class progressMeasureComponent extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {t} = this.props;
        return (
            <>
               <div className="text-center">
                   <button className='ui button icon bg-light'>
                       <span className='text-primary'>{t('progressPage.current')}</span>
                       <div className='f-2 mt-3'>80</div>
                   </button>
                   <button className='ui button icon bg-light'>
                       <span className='text-primary'>{t('progressPage.target')}</span>
                       <div className='f-2 mt-3'>3</div>
                   </button>

               </div>
                <div className="header">
                    <div className='row'>
                        <div className="col-sm-5">
                            <img src={waistIcon} className='icon w-25' />
                            <h3 className='d-inline-block'>{t('progressPage.changesWaist')}</h3>
                        </div>
                        <div className="col-sm-7">
                            <h3>{t('progressPage.weightChanges')}</h3>
                        </div>
                    </div>
                </div>
                <div className="row mt-3 text-center">
                    <div className="col-sm-4">
                        <h4>{t('progressPage.day')}</h4>

                    </div>
                    <div className="col-sm-4">
                        <h4>{t('progressPage.value')}</h4>

                    </div>
                    <div className="col-sm-4">
                        <h4>{t('progressPage.change')}</h4>

                    </div>
                </div>
            </>
        );
    }
}

export default withTranslation('translation') (progressMeasureComponent);