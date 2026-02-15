import React, {Component} from 'react';
import {withTranslation} from "react-i18next";
import {ChatService} from "../service/chat.service";

class LoginChatComponent extends Component {
     constructor(props) {
         super(props);
         this.state = {
             username : null
         }
     }


     chatLoginHandler = () => {
         const {username} = this.state;
         //  Generate UID
         const uid = Math.random().toString(36).substr(2, 9);
         const chatService  = new ChatService();
         chatService.createUser({userId: uid , userName : username}).then(user => {
             chatService.getAuthToken(user.uid).then(token => {
                chatService.login(token.authToken).then(logging => {
                    if(logging.status === "online") {
                        // TODO: redirect to chat room.
                        chatService.fetchAllUsers(30).then(users => {
                            console.log("Chat Users =>" , users);
                        })
                    }
                })
             }).catch(error => {
                 console.log(error);
             })
         } , error => {
             console.log("Error has been thrown when try to login into chat" , error)
         })
     }

    render() {
         const {t} = this.props;
         const isArabic = t('local') === 'ar';
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card w-50 mx-auto"
                         style={{borderRadius:'20px', boxShadow:'0px 0px 25px rgb(0 123 255 / 0.2)'}}
                        >
                            <div className="card-body "
                             style={{padding:'60px 0'}}
                            >

                                <div className="my-4 text-center">
                                    <h5> {isArabic ? 'الدخول الى الشات' : 'Login into Chat'}  </h5>
                                </div>

                                <div className="form-group text-center">

                                    <input className="form-control w-75 mx-auto"
                                           style={{borderRadius:'50px' , padding:'20px'}}
                                            onChange={e => {
                                                e.preventDefault()
                                                this.setState({username : e.target.value} , () => {
                                                    console.log("Current State" , this.state);
                                                })
                                            }}
                                           placeholder={isArabic ? 'قم بإدخال اسم المستخدم' : 'Enter your username'}/>
                                </div>
                                <div className="form-group text-center">
                                    <button
                                        onClick={e => {
                                            e.preventDefault();
                                            this.chatLoginHandler();
                                        }}
                                        disabled={!this.state.username} className="btn btn-secondary w-75 ">
                                        {isArabic ? 'الدخول' : 'login'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withTranslation('translation') (LoginChatComponent);