import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withTranslation} from "react-i18next";
import ModalComponent from "../common/modal/modal.component";
import ImageUploader from "react-images-upload";
import PrimaryButtonComponent from "../ButtonComponent/primary-button.component";
import { FiX } from "react-icons/fi";

class RegisterAddDocComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            photos: [],
            open:false,
            images:[],
            displayImages:[]
        }
    }


    onDrop = (pictureFiles, pictureDataURLs) => {
        debugger;
        this.setState({
            images: pictureFiles,
            displayImages : pictureDataURLs
        });
    }


    deleteImage = (index) => {
        let {images , displayImages} = this.state;
        images.splice(index , 1);
        displayImages.splice(index , 1);
        this.setState({images , displayImages});
    }

    render() {
        const {t} = this.props;
        const {receiveImages} = this.props;
        return (
            <div className="form-group">
                <label style={{color:'#8c99a5'}}> {t('register.addDoc')} </label>
                <div>
                    <div>
                        <button onClick={e => {
                            e.preventDefault();
                            this.setState({open : true})
                        }}  className="btn btn-outline-primary mt-2">
                            {t('shared.add')} +
                        </button>
                    </div>
                    <ModalComponent size="small" isOpen={this.state.open} hideAction={true}
                     handleClosed={e => {
                         this.setState({open:false})
                     }}
                    >
                     <div style={{textAlign:t('local') === 'ar' ? 'right': 'left'}}>
                         <label style={{color:'#8c99a5' }}> {t('register.addDoc')} </label>
                         <ImageUploader
                             withIcon={true}
                             buttonText='Choose images'
                             onChange={this.onDrop}
                             imgExtension={['.jpg', '.jpeg','.gif', '.png', '.gif']}
                             maxFileSize={5242880}
                         />
                         <div className="my-4 d-flex flex-wrap">
                             {
                                 this.state.displayImages && this.state.displayImages.map( (img , i) => {
                                     return (
                                         <span style={{width:'60px' , display:'block', margin:'15px 15px' , height:'60px', position:'relative' ,border:'1px' +
                                                 ' solid' +
                                                 ' #dadada'}}>
                                         <img key={i} src={img}
                                              style={{width:'60px' , height:'60px'}}
                                              alt=""/>
                                              <i onClick={e => {
                                                  this.deleteImage(i);
                                              }} style={{width:'30px' , height:'30px', backgroundColor:'#e36660' ,borderRadius:'50px' , textAlign:'center' ,lineHeight:'30px' , position:'absolute' , top:'-15px' , right:'-15px' , cursor:'pointer' , color:'#fff' }}>
                                                  <FiX />
                                              </i>
                                    </span>

                                     );
                                 })
                             }
                         </div>

                         <div className="mt-4">
                             <PrimaryButtonComponent
                                 clickHandler={e => {
                                     if(receiveImages) {
                                         const {images} = this.state;
                                         this.setState({open:false})
                                         receiveImages(images);
                                     }
                                 }}
                                 title={t('shared.add')}  isSecondaryBtn={true}  />
                         </div>
                     </div>
                    </ModalComponent>

                </div>

            </div>
        );
    }
}


export default withTranslation('translation') (RegisterAddDocComponent);