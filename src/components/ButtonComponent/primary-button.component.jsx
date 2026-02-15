import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Loader } from 'semantic-ui-react'
class PrimaryButtonComponent extends Component {


    render() {
        const {switchLoading , disable}  = this.props;

        return (
            <button  style={{backgroundColor: this.props.backgroundColor}} disabled={switchLoading || disable} onClick={(e) => {
                e.preventDefault();
                if(this.props.clickHandler) {
                    this.props.clickHandler();
                }
            }} className={`btn btn-${this.props.isSecondaryBtn  ?  'secondary' :'primary'} ${this.props.className? this.props.className : ''} ${this.props.isOutline? 'outline-btn' : ''}    font-weight-bold`}>
                {!switchLoading ?  this.props.title : <Loader active={switchLoading} inline='centered' />}

            </button>
        );
    }
}
PrimaryButtonComponent.propTypes = {
    title:PropTypes.string.isRequired,
    clickHandler: PropTypes.func,
    switchLoading : PropTypes.bool,
    isSecondaryBtn : PropTypes.bool,
    isOutline : PropTypes.bool,
    disable:PropTypes.bool
}
export default PrimaryButtonComponent;