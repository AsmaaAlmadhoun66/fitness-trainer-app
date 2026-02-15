import React, {Component} from 'react';
import { FiBell } from "react-icons/fi";
import  './notification.component.css';
class NotificationComponent extends Component {
    render() {
        return (
            <div className="notify-container">
            {/*   icon */}
             <div className="icon">
                 <FiBell />
                 <span className="bell-circle">
                 </span>
             </div>
            </div>
        );
    }
}

export default NotificationComponent;