import React, {Component} from 'react';
import {
    Button,
    Checkbox,
    Grid,
    Header,
    Icon,
    Image,
    Menu,
    Segment,
    Sidebar,
} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'
import {withTranslation} from "react-i18next";
import './side-bar.component.css';
import logo from '../../../assets/images/menu-logo-01.svg';
import homeIcon from '../../../assets/icons/home-01.svg';
import chatIcon from '../../../assets/icons/chat.svg';
import profileIcon from '../../../assets/icons/profile-01.svg';
import templateIcon from '../../../assets/icons/template.svg';
import settingIcon from '../../../assets/icons/settings.svg';
import logoutIcon from '../../../assets/icons/logout-01.svg';
import AccountService from "../../../services/account-service/account.service";
import {Link, withRouter } from "react-router-dom";
import addUSerICo from '../../../assets/icons/add-user-01.svg';
import fitnessIco from '../../../assets/icons/fitness-01.svg';
class SideBarComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isSas: false
        }
    }

    componentWillMount() {
        const accountService = new AccountService();
       const isSas =  accountService.Account_Type === 'SAS';
       this.setState({isSas});
    }

    logoutHandler = () => {
        const accountService = new AccountService() ;
        accountService.logout().then(_ => {
            debugger;
            this.props.history.push('/login')
        })
    }

    render() {
        const { t } = this.props;
        const isArabic = this.props.i18n.language === 'ar';
        const direction = isArabic ? 'right':'left';
        return (
            <Grid>
                <Grid.Column width={16} >
                    <Sidebar.Pushable as={Segment}>
                        <Sidebar
                            as={Menu}
                            animation={'slide along'}
                            direction={direction}
                            icon='labeled'
                            inverted
                            vertical
                            visible={true}
                            width='wide'
                        >
                            <Menu.Header >
                                <Image src={logo} width={150} style={{margin:'25px auto'}}/>
                            </Menu.Header>
                            <Menu.Item  as='a'
                                        className={this.state.active === '/' ? 'active' : {}}
                                        onClick={e => {
                                this.props.history.push('/');
                                this.setState({ active: '/' });
                            }}>
                                <Image src={homeIcon} className='icon' width={25} />
                                {t('menu.dashboard')}
                            </Menu.Item>
                            <Menu.Item as='a'
                                       className={this.state.active === 'chats' ? 'active' : {}}
                                       onClick={e => {
                                           this.props.history.push('/chat');
                                           this.setState({ active: 'chats' });
                                       }}>
                                  <Image src={chatIcon} className='icon' width={25} />
                                {t('menu.chats')}
                            </Menu.Item>
                            {
                                this.state.isSas ?
                                    <>
                                        <Menu.Item as='a'
                                                   className={this.state.active === 'trainees' ? 'active' : {}}
                                                   onClick={e => {
                                                       this.props.history.push('/trainees')
                                                       this.setState({ active: 'trainees' });
                                                   }}
                                        >
                                            <Image src={fitnessIco} className='icon' width={25} />
                                            {t('menu.trainees')}
                                        </Menu.Item>
                                    </>: null
                            }

                            <Menu.Item as='a'
                                       className={this.state.active === 'profile' ? 'active' : {}}
                                       onClick={e => {
                                this.props.history.push('/profile');
                                this.setState({ active: 'profile' });
                            }}>
                                <Image src={profileIcon} className='icon' width={25} />
                                {t('menu.profile')}
                            </Menu.Item>
                            <Menu.Item as='a'
                                       className={this.state.active === 'template' ? 'active' : {}}
                                       onClick={e => {
                                           this.props.history.push('/template');
                                           this.setState({ active: 'template' });
                                       }}
                            >
                                <Image src={templateIcon} className='icon' width={25} />
                                {t('menu.templates')}
                            </Menu.Item>
                            <Menu.Item as='a'
                                       className={this.state.active === 'setting' ? 'active' : {}}
                                       onClick={e => {
                                this.props.history.push('/setting');
                                this.setState({ active: 'setting' });
                            }}
                            >
                                <Image src={settingIcon} className='icon' width={25} />
                                {t('menu.settings')}
                            </Menu.Item>
                            <Menu.Item as='a' onClick={(e) => {
                                e.preventDefault();
                                this.logoutHandler();
                            }}>
                                <Image src={logoutIcon} className='icon logout' width={25} />
                                {t('menu.logout')}
                            </Menu.Item>
                        </Sidebar>
                        <Sidebar.Pusher>
                            {this.props.children}
                        </Sidebar.Pusher>
                    </Sidebar.Pushable>
                </Grid.Column>
            </Grid>


        );
    }
}

export default withTranslation("translation") ( withRouter (SideBarComponent));