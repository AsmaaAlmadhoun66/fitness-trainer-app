import './App.css';
import  { BrowserRouter as Router, Route, Switch  , Redirect } from 'react-router-dom'
import LoginComponent from "./pages/login/login.component";
import React from "react";
import RegisterComponent from "./pages/register/register.component";
import ForgetPasswordComponent from "./pages/forget-password/forget-password.component";
import SideBarComponent from "./components/common/side-bar/side-bar.component";
import FooterComponent from "./components/common/footer/footer.component";
import HeaderComponent from "./components/common/header/header.component";
import {ToastContainer} from "react-toastify";
import AccountService from "./services/account-service/account.service";
import {ChatService} from "./pages/group-chat/service/chat.service";
import TraineeService from "./services/trainee-service/traniee.service";



class App extends  React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthorize : false,
            hasHorizontalScrollbar : false,
            hasVerticalScrollbar:false,
            isActive:false
        }
    }
   async componentWillMount() {

        const accountService = new AccountService();
         const _authorize = accountService.isAuthorize();


        const isActive = JSON.parse(accountService.isAccountActivated());
        this.setState({
             isAuthorize : _authorize,
             isActive
         })

      await this.chatLoginHandler();

    }


    displayScrollbar  = () => {
        const pusherElement = document.getElementsByClassName('pusher')[0];
        if(pusherElement) {
            const hasHorizontalScrollbar = pusherElement.scrollWidth > pusherElement.clientWidth;
            const hasVerticalScrollbar = pusherElement.scrollHeight > pusherElement.clientHeight;
            this.setState({hasHorizontalScrollbar , hasVerticalScrollbar})
        }

    }



    chatLoginHandler = async () => {
       const accountService = new AccountService();
       const userData = JSON.parse( accountService.userData);
       if (!userData)
           return ;
        //  Generate UID
        const chatService  = new ChatService(userData.id+"listen");
        try {
            debugger;
            // the user may be have an account in cometchat or not.
       const loginStatus =      await  chatService.getAuthToken(userData.id.toString() + "_t" )
       if(loginStatus) {
           chatService.login('').then(logging => {
               if(logging.status === "online") {
                   alert("Logged into chat")
               }
           })
       }else {
           chatService.createUser({userId: userData.id.toString() + "_t" , userName : userData.email , metadata:accountService.userData }).then(user => {
               chatService.getAuthToken(user.uid).then(token => {
                   chatService.login(token.authToken).then(logging => {
                       if(logging.status === "online") {
                       }
                   })
               })
           })
       }


        }catch(error) {
           console.log(error)
        }
    }

    render() {
        if(!this.state.isAuthorize) {
            return <Redirect to={'/login?notAuth=true'} />
        }

        if(!this.state.isActive) {
            return <Redirect to={'/login?notActive=true'} />
        }
        return (
            <>
                <SideBarComponent>
                    <HeaderComponent />
                    {this.props.children}
                    <div className="mt-4">
                        <FooterComponent />
                    </div>

                    {

                        this.state.hasVerticalScrollbar ?   <div className="scroll-bar">
                            scroll
                        </div>  : null
                    }
                </SideBarComponent>
            </>
        );
    }
}
export default App;
