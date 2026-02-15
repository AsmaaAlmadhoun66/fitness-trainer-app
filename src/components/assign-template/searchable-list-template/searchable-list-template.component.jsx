import React, {Component} from "react";
import { Input } from 'semantic-ui-react'
import {withTranslation} from "react-i18next";
import './searchable-list-template.component.css';

class ListItem extends Component{
    render () {
        return (
            <li onClick={this.props.onClick}>
                <span>{this.props.name}</span>
            </li>
        )
    }
}

class SearchableListTemplateComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayedData: this.props.list
        }
    }
    searchHandler = (event) => {
        const {t} = this.props;
        let event2 = event.target.value;
        let displayedData;
        if(event2 !== ''){
            t('local') === 'ar' ?
              displayedData = this.props.list.filter(s => s.title_ar.includes(event2))
            :
              displayedData = this.props.list.filter(s => s.title.includes(event2))
            this.setState({
                displayedData: displayedData
            })
        }
        else {
            this.setState({
                displayedData: this.props.list
            })
        }

    }

    render () {
        const {t} = this.props;
        let List = this.state.displayedData;
        return (
            <div className="SearchableListTemplateComponent">
                <Input type="text" icon='search' className="search" placeholder={t('traineeModal.searchFor')} onChange={this.searchHandler.bind(this)}/>
                <ul>
                    {
                        List.map((el) => {
                            return <ListItem key={el.id} onClick={(e)=> this.props.exercise_muscleFunc(el)}
                                             category={el.category}
                                             name={t('local')==='ar' ? el.title_ar : el.title}
                            />
                        })
                    }
                </ul>
            </div>
        )
    }
}
export default withTranslation('translation')( SearchableListTemplateComponent);
