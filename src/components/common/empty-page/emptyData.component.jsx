import React, {Component} from 'react';
import EmptyPage from "../../../assets/images/emptyContent.png";
import PropTypes from "prop-types";

class EmptyDataComponent extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="text-center mt-4" style={{width:'100%'}}>
                <img src={EmptyPage} alt="empty" className='w-25' />
                <h5 className='my-3'>{this.props.title}</h5>
            </div>
        );
    }
}
EmptyDataComponent.propTypes = {
    title: PropTypes.string,
}
export default EmptyDataComponent;