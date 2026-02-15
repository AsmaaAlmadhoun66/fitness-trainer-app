import React, {Component} from 'react';
import './add-template.component.css';
import {FiPlus} from "react-icons/fi/index";
import ModalComponent from "../common/modal/modal.component";
import PenWriteIco from '../../assets/icons/pen_write_default_color-01.svg';
import InputTextComponent from "../InputTextComponent/input-text.component";
import TemplateService from "../../services/template-service/template.service";
class AddTemplateComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open : false,
            templateName : null,
            size : 'mini'
        }
    }

    addTemplateHandler = (e) => {
        if(e) {
            e.preventDefault();
        }


        const {templateName} = this.state;
        if(templateName && templateName.length > 0) {
            const templateService = new TemplateService();
            templateService.createTemplate({name:templateName}).then(res => {
               this.onClose(null);
                if(res && res.result) {
                    const {afterAdded} = this.props;
                    if(afterAdded) {
                        afterAdded(true);
                    }
                }
            }).catch(error => {

            })
        }
    }

    onClose = (e) => {
        if(e) {
            e.preventDefault();
        }
        this.setState({open:false , templateName : null});
    }

    valueHandler = (e) => {
        if(e) {
            const templateName = e.target.value;
            this.setState({templateName})
        }
    }

    render() {
        const {t} = this.props;
        return (
            <>
                <button
                    onClick={e => {
                        e.preventDefault();
                        this.setState({open:true})
                    }}
                    className="btn btn-outline-primary" style={{borderRadius:'50px'}}>
                     {t('templatePage.add')}
                    <FiPlus />
                </button>
                <ModalComponent size={this.state.size} hideAction={true} isOpen={this.state.open} >
                    <div className="add-template">
                        <div className="title" style={{textAlign: t('local') === 'ar' ? 'right' : 'left'}}>
                            <span>
                                <img src={PenWriteIco} />
                            </span>
                            <strong>
                                {t('templatePage.add')}
                            </strong>
                        </div>
                        <div className="form-group">
                           <InputTextComponent valueHandler={this.valueHandler} value={this.state.templateName} isRequired={true} labelTitle={null} />
                        </div>
                        <div className="form-group d-flex justify-content-center">
                            <button className="btn btn-primary" onClick={this.addTemplateHandler}>
                                {t('shared.save')}
                            </button>
                            <button className="btn btn-secondary"  onClick={this.onClose}>
                                {t('shared.cancel')}
                            </button>
                        </div>
                    </div>

                </ModalComponent>
            </>
        );
    }
}

export default AddTemplateComponent;