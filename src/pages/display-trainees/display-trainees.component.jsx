import React, {Component} from 'react';
import AccountService from "../../services/account-service/account.service";
import BreadcrumbComponent from "../../components/common/breadcrumb/breadcrumb.component";
import {withTranslation} from "react-i18next";
import SendInvitationComponent from "../send-invitation/send-invitation.component";

class DisplayTraineesComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            invitations : [] ,
            loading:false
        }
    }

    componentWillMount() {
      this.fetchInvitations();
    }
    fetchInvitations = () => {
        const accountService =  new AccountService();
        this.setState({loading:true})
        accountService.invitation.then(res => {
            this.setState({loading:false})
            if(res && res.status) {
                // get data successfully;
                this.setState({invitations:  res.result} , () => {
                    console.log('Current State' , this.state);
                });
            }
        }).catch(error => {
            this.setState({loading:false})
        })

    }


    refreshAPI = () => {
        this.fetchInvitations();
    }

    render() {
        const {t} = this.props;
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <BreadcrumbComponent title={t('menu.trainees')} />
                    </div>

                    <div className="col-sm-12 mt-4">
                        <SendInvitationComponent refreshApi={this.refreshAPI} />
                    </div>
                    <div className="col-sm-12 mt-4">
                        <div className="row">
                            {
                                this.state.invitations.map((item , key) => {
                                    return (
                                        <div className="col-md-4 col-sm-12 mt-4">
                                            <div className="card" style={{borderRadius:'10px',overflow:'hidden'}} >

                                                <div className="card-body" style={{padding:'0' , overflow:'hidden'}}>

                                                    <span style={{float:t('local') === "ar" ? 'right' : 'left' , padding:'12px'}}> {item.trainee.email} </span>
                                                    <span style={{backgroundColor:item.status ==="b" ? "#c1272d" : "#42a1ef" ,color:'#fff',padding:'12px', float:t('local') === "ar" ? 'left' : 'right'}}>
                                                        {item.status ==="b" ? t('local') === "ar" ? "قيد الإنتظار" : "Pending" :t('local') === "ar" ? "مشترك": "Subscribe"}
                                                    </span>
                                                    <span style={{clear:'both'}}>

                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withTranslation('translation') (DisplayTraineesComponent);