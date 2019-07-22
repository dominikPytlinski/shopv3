import React, { Component } from 'react'

import Categories from './Categories';
import ProductsList from './ProductsList';

class Products extends Component {
    
    constructor(props)
    {
        super(props);
        this.state = {
            selectedCategory: null
        }
    }
    
    products = (categoryId) => {
        this.setState({ selectedCategory: categoryId });
    }
    
    render() {
        return (
            <div>
                <Categories products={this.products}/>
                <ProductsList category={this.state.selectedCategory} />
            </div>
        )
    }
}

export default Products
