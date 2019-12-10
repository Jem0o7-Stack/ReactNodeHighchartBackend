import React, { Component } from "react";
import '../css/imgpre.css';
import $ from 'jquery';
import axios from 'axios';

class ImageUpload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: '',
            imagePreviewUrl: ''
        };
        this._handleSubmit = this._handleSubmit.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
    }

    _handleSubmit(e) {
        e.preventDefault();

        var form = $('#FormUpload')[0];
        var fileData = new FormData(form);

        var url = "http://localhost:1337/ImgPreview";
        axios.post(url, fileData)
            .then((result) => {                
                this.setState({
                    imagePreviewUrl: ""                    
               })
            });       
    }

    handleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        const file = e.target.files[0];
        
        reader.onloadend = () => {
            this.setState({
                selectedFile: file,
                imagePreviewUrl: reader.result
            });
        }
        if (file) {
            reader.readAsDataURL(file);
            this.setState({
                imagePreviewUrl: reader.result
            })
        }
        else {
            this.setState({
                imagePreviewUrl: ""
            })
        }
        reader.readAsDataURL(file)
    }

    render() {
        let { imagePreviewUrl } = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<img src={imagePreviewUrl} />);
        }
        else {
            $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
        }

        return (
            <div className="previewComponent">
                <form onSubmit={this._handleSubmit} className="formsty" enctype="multipart/form-data" id="FormUpload">
                    <input className="fileInput"
                        type="file"
                        onChange={this.handleImageChange}
                        name="selectedFile" />

                    <button className="submitButton"
                        type="submit"
                        >Upload Image</button>
                </form>
                <div className="imgPreview">
                    {$imagePreview}
                </div>

            </div>
        )
    }
}
export default ImageUpload;