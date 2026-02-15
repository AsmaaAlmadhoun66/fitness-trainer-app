import React, {Component} from 'react';
import './pre-authorization.component.css';
import  logo from '../../assets/images/logo-01.svg';
import { withTranslation } from "react-i18next";
import logoBg from '../../assets/images/logo-bg-01.svg';
class PreAuthorizationComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lang : 'عربى'
        }
    }

    changeLangHandling = () => {
        const lang = this.state.lang === "عربى" ? 'en': 'ar';
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
        const { t } = this.props;
        const isArabic = this.props.i18n.language === 'ar';
        return (
            <div className="pre-auth">
                <span className="logo-bg">
                    <img src={logoBg} />
                </span>
                <div className="app-card" style={{left:isArabic? 'auto' : '0' , right: isArabic ? '0' : 'auto'}}>
                   <div className="app-card-header">
                       <img src={logo} className="logo" />
                   </div>
                    <div className="app-card-body">
                        {this.props.children}
                        <div style={{ margin:'11px 0 5px 0', textAlign:'center' , color:'#333'}}>
                            <strong style={{cursor:'pointer'}} onClick={this.changeLangHandling}> {isArabic ? 'English':'عربى'} </strong>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default withTranslation("translation")( PreAuthorizationComponent);