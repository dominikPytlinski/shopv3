import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import AddProductForm from './AddProductForm';

class AddProduct extends Component {
    render() {
        return (
            <div className="add-product-container">
                {this.props.isLogged ? <AddProductForm /> : <Redirect to="/login" />}
            </div>
        )
    }
}

export default AddProduct;
