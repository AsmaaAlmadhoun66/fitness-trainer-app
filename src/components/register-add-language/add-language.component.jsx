import React, {Component} from 'react';
import {withTranslation} from "react-i18next";
import ModalComponent from "../common/modal/modal.component";
import InputTextComponent from "../InputTextComponent/input-text.component";
import PropTypes from 'prop-types';
class AddLanguageComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open :false,
            val : null,
            languages : [],
        }
    }

    componentWillMount() {
        const {value} = this.props;
        this.setState({languages: value})
    }

    addHandling = () => {
        const {languages , val} = this.state;
        languages.push(val);
        if(this.props.addHandler) {
            this.props.addHandler(languages);
        }
        this.setState({languages , open:false , val :null})
    }


    deleteHandling = (item) => {

        let {languages} = this.state;
        languages = languages.filter(i => i!== item);
        if(this.props.removeHandler) {
            this.props.removeHandler(item);
        }
        this.setState({languages});
    }

    render() {
        const  {t} = this.props;
        return (
            <div className="form-group">
                <label > {t('register.languages')} </label>
                <div>
                     <div style={{float:t('local') === 'ar' ? 'right' : 'left'}}>
                         <button onClick={e => {
                             e.preventDefault();
                             this.setState({open : true})
                         }}  className="btn btn-outline-primary mt-2">
                             {t('shared.add')} +
                         </button>
                     </div>
                    <div className="languages" style={{float:t('local') === 'ar' ? 'right' : 'left'}}>
                        <ul className="d-flex flex-wrap">
                            {
                                this.state.languages && this.state.languages.map((item , key) => {
                                    return (
                                        <li className="mx-2 mt-2">
                                            <button  className="btn btn-outline-secondary delete-hover"

                                             onClick={e => {
                                                  this.deleteHandling(item)
                                                }}
                                            >
                                                {item}
                                            </button>
                                        </li>
                                    );
                                })
                            }
                        </ul>
                    </div>
                    <div className="clearfix">

                    </div>
                    <ModalComponent size="small" handleClosed={e => {
                        this.setState({open : false})
                    }} isOpen={this.state.open} hideAction={true}>
                        <InputTextComponent
                            valueHandler={e => {
                                this.setState({val: e.target.value})
                            }}
                            value={this.state.val}
                            isArabic={t('local') === 'ar'} style={{textAlign:t('local') === 'ar' ? 'right' : 'left'}} isRequired={true} labelTitle={t('register.lang')}  />

                       <div className="text-center">
                           <button onClick={this.addHandling} className="btn btn-outline-primary"> {t('shared.add')}  </button>
                       </div>

                    </ModalComponent>

                </div>
            </div>
        );
    }
}

AddLanguageComponent.propTypes = {
    addHandler : PropTypes.func,
    removeHandler : PropTypes.func,
    value: PropTypes.array
}

export default withTranslation('translation')(AddLanguageComponent);