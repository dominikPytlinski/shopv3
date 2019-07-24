import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import Dropzone from 'react-dropzone';

import AddProductForm from './AddProductForm';

class AddProduct extends Component {
    render() {
        return (
            <div className="add-product-container">
                <AddProductForm />
            </div>
        )
    }
}

export default AddProduct;
