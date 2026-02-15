import React, {Component} from 'react';
import PropTypes from 'prop-types';
class DateComponent extends Component {
    render() {
        return (
            <div className={this.props.isActive ? 'date active' : 'date'}>
                <span> {this.props.dateNumber} </span>
                <div>  {this.props.dateName} </div>
            </div>
        );
    }
}

DateComponent.propTypes= {
    dateNumber : PropTypes.number.isRequired,
    dateName : PropTypes.string.isRequired,
    isActive : PropTypes.bool
}

export default DateComponent;