import React, {Component} from 'react';
import './assign-template.component.css';
import ModalComponent from "../common/modal/modal.component";
import PropTypes from 'prop-types';
import AddDaysTemplateComponent from "./add-days-template/add-days-template.component";
import ExerciseMealTemplateComponent from "./exercise-meal-template/exercise-meal-template.component";
class AssignTemplateComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            templateId : null
        }
    }

    componentWillMount() {
        const {templateId} = this.props;
        this.setState({templateId})
    }

    clickNumberHandler = (number) => {
       console.log(number);
    }

    render() {
        debugger;
        const  {open  , handleClosingModal } = this.props;
        return (
            <>
                <ModalComponent size="small" isOpen={open} handleClosed={handleClosingModal}>
                    <AddDaysTemplateComponent daysNumber={7} clickNumberHandler={this.clickNumberHandler} />
                    <ExerciseMealTemplateComponent />
                </ModalComponent>
            </>
        );
    }
}

AssignTemplateComponent.propTypes = {
    open : PropTypes.bool,
    templateId : PropTypes.number.isRequired,
    handleClosingModal : PropTypes.func
}

export default AssignTemplateComponent;