import React, {Component} from 'react';
import PropTypes from "prop-types";
import  './breadcrumb.component.css';
class BreadcrumbComponent extends Component {
    render() {
        const {title} = this.props;

        return (
            <div className="breadcrumb-app">
                 <span>
                    {title ? title : 'Unknown'}
                </span>

                <span className="separator">

                </span>
            </div>
        );
    }
}
BreadcrumbComponent.propTypes = {
    title : PropTypes.string.isRequired
}
export default BreadcrumbComponent;