import React, {Component} from 'react';
import {withTranslation} from "react-i18next";
import { CometChat } from "@cometchat-pro/chat";
import config from "../../config";
import ChatUsersComponent from "./chat-users/chat-users.component";
import {ChatService} from "./service/chat.service";
import TraineeService from "../../services/trainee-service/traniee.service";

class ChatGroupComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users : []
        }
    }

    async componentDidMount() {
        // fetch user chat .
        const chatService = new ChatService();
        debugger;

        // const currentUser = await  chatService.getCurrentUser();
        this.fetchUsersChat();
    }

    fetchUsersChat = () => {
        debugger;
        // TODO: redirect to chat room.
        const traineeService = new TraineeService();
        traineeService.trainees.then(response => {
            if(response && response.status) {
                const chatService = new ChatService();
                const ids = response.result.map(r => r.id);
                chatService.fetchSpecificUsers(ids).then(users => {
                    this.setState({users})
                })
            }
        })
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-4">
                        <ChatUsersComponent users={this.state.users} />
                    </div>
                </div>
            </div>
        );
    }
}

export default withTranslation('translation') (ChatGroupComponent);