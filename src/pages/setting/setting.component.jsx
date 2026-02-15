import React, {Component} from 'react';
import BreadcrumbComponent from "../../components/common/breadcrumb/breadcrumb.component";
import {withTranslation} from "react-i18next";
import {Select} from "semantic-ui-react";
import  './setting.component.css';
class SettingComponent extends Component {
    constructor(props) {
        super(props);
        this.state =  {
            languages : [
                { key:'ar',  value : 'ar' , text:'عربى'},
                { key:'en',  value : 'en' , text:'English'}
            ],
            currentLang : null,
            receiveTrainingRequests: true,
            receiveRenewalRequests : true,
            notification:true
        }
    }
    componentWillMount() {

        console.log(this.props)
        const currentLang = this.props.i18n.language;
        this.setState({currentLang});
    }

    fetchSettings = () => {
        // TODO : fetch Settings.
    }

    bindChanges = () => {
        console.log("current state is" , this.state);
    }

    changeLangHandling = (lang) => {

        this.props.i18n.changeLanguage(lang).then(resolve => {
            this.setState({
                lang : lang === 'ar' ? 'عربى' : 'English'
            })
        });
        if(lang === 'ar') {
            document.body.classList.add('rtl');
            // document.getElementById('styleDirection').href = 'assets/css/style-rtl.css'
            // document.getElementById('styleResponsive').href = 'assets/css/responsive-rtl.css'
        }else
        {
            document.body.classList.remove('rtl');
            // document.getElementById('styleDirection').href = 'assets/css/style.css';
            // document.getElementById('styleResponsive').href = 'assets/css/responsive.css'
        }
    }

    render() {
        const {t} = this.props;
        return (
            <div className="container setting">
                <div className="row">
                    <div className="col-sm-12">
                        <BreadcrumbComponent title={t('breadcrumb.setting')} />
                    </div>
                    <div className="col-sm-10 m-auto ">
                        <div className="form-group mt-4">
                            <label>{t('settingPage.language')} </label>
                            <Select style={{textAlign:t('local')==='ar' ? 'right' : 'left'}}
                                    fluid placeholder={t('local') === 'ar' ? 'حدد اللغة' : 'Select language'}
                                    options={this.state.languages}
                                    value={this.state.currentLang}
                                    onChange={ (e , v)=> {
                                        // TODO: adding it into localStorage.
                                        this.setState({currentLang : v.value} , () => {
                                            this.changeLangHandling(v.value)
                                        })
                                    }}
                            />
                        </div>
                        <div className="form-group mt-4">
                            <div className="strip">
                                <div className="row">
                                    <div className="col-sm-7">
                                        <span className="title">
                                            {t('settingPage.receiveTrainingRequest')}
                                        </span>
                                    </div>
                                    <div className="col-sm-5">
                                        <div className="d-flex align-items-center ">
                                            <div className="round flex-grow-1">
                                                <input type="checkbox"  id="receiveRequests"  checked={this.state.receiveTrainingRequests}
                                                       onChange={e => {

                                                          this.setState({receiveTrainingRequests:true} , () => {
                                                              this.bindChanges();
                                                          })
                                                       }}
                                                       />
                                                <label htmlFor="receiveRequests">
                                                </label>

                                            </div>
                                            <div className="round flex-grow-1">
                                                <input type="checkbox"  id="notReceiveRequests"
                                                       onChange={e => {


                                                           this.setState({receiveTrainingRequests:false} , () => {
                                                               this.bindChanges();
                                                           })
                                                       }}
                                                       checked={!this.state.receiveTrainingRequests}  />
                                                <label htmlFor="notReceiveRequests">
                                                </label>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="strip">
                                <div className="row">
                                    <div className="col-sm-7">
                                        <span className="title">
                                            {t('settingPage.receiveRenewalRequest')}
                                        </span>
                                    </div>
                                    <div className="col-sm-5">
                                        <div className="d-flex align-items-center ">
                                            <div className="round flex-grow-1">
                                                <input type="checkbox"  id="receiveRenewal"  checked={this.state.receiveRenewalRequests}
                                                       onChange={e => {

                                                           this.setState({receiveRenewalRequests:true}, () => {
                                                               this.bindChanges();
                                                           })
                                                       }}
                                                />
                                                <label htmlFor="receiveRenewal">
                                                </label>

                                            </div>
                                            <div className="round flex-grow-1">
                                                <input type="checkbox"  id="notReceiveRenewal"
                                                       onChange={e => {


                                                           this.setState({receiveRenewalRequests:false} , () => {
                                                               this.bindChanges();
                                                           })
                                                       }}
                                                       checked={!this.state.receiveRenewalRequests}  />
                                                <label htmlFor="notReceiveRenewal">
                                                </label>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="strip">
                                <div className="row">
                                    <div className="col-sm-7">
                                        <span className="title">
                                            {t('settingPage.notification')}
                                        </span>
                                    </div>
                                    <div className="col-sm-5">
                                        <div className="d-flex align-items-center ">
                                            <div className="round flex-grow-1">
                                                <input type="checkbox"  id="notification"  checked={this.state.notification}
                                                       onChange={e => {

                                                           this.setState({notification:true} , () => {
                                                               this.bindChanges();
                                                           })
                                                       }}
                                                />
                                                <label htmlFor="notification">
                                                </label>

                                            </div>
                                            <div className="round flex-grow-1">
                                                <input type="checkbox"  id="notNotification"
                                                       onChange={e => {


                                                           this.setState({notification:false} , () => {
                                                               this.bindChanges();
                                                           })
                                                       }}
                                                       checked={!this.state.notification}  />
                                                <label htmlFor="notNotification">
                                                </label>

                                            </div>
                                        </div>
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

export default withTranslation('translation') (SettingComponent);