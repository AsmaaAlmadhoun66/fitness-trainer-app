import React, {Component} from 'react';
import { Dropdown } from "semantic-ui-react";
import {withTranslation} from "react-i18next";
import arFlgIco from '../../../assets/icons/ar-flag.png';
import enFlgIco from '../../../assets/icons/en-flg.png';
import './change-language.component.css';
class ChangeLanguageComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lang : null ,
            languages : [
                {
                    key : 'ar'  ,
                    text:'عربى' ,
                    value:'ar' ,
                    image : {
                        avatar:true,
                        src : arFlgIco
                    }
                },
                {
                    key : 'en'  ,
                    text:'English' ,
                    value:'en' ,
                    image : {
                        avatar:true,
                        src : enFlgIco
                    }
                }
            ]
        }
    }

    componentWillMount() {
        if(this.props.i18n && this.props.i18n.language) {
            this.setState({lang :this.props.i18n.language})
        }
    }

    changeLangHandling = (lang) => {
        debugger;
        if(!lang)
            return ;
        this.props.i18n.changeLanguage(lang).then(resolve => {
            this.setState({
                lang : lang === 'ar' ? 'ar' : 'en'
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
        const { t } = this.props;
        const isArabic = this.props.i18n.language === 'ar';
        return (
            <div>
                <Dropdown
                    placeholder="change lang"
                    inline
                    options={this.state.languages}
                    value={this.state.lang}
                    onChange={(e , data) => {
                        debugger;
                        const value = data.value;
                        this.changeLangHandling(value);
                        this.setState({lang : value})
                    }}
                />
            </div>
        );
    }
}
export default withTranslation('translation') (ChangeLanguageComponent);