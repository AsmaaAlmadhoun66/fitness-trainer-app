import React, {Component} from 'react';
import {withTranslation} from "react-i18next";
import './progress.component.css';


class progressPictureComponent extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {t} = this.props;
        return (
            <>
                Picture
            </>
        );
    }
}

export default withTranslation('translation') (progressPictureComponent);