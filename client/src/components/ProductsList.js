import React, { Component } from 'react'
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';

import Loading from './Loading';

import { PRODUCTS_BY_CATEGORY_QUERY, PRODUCTS_QUERY } from '../queries/Queries';

class ProductsList extends Component {    
    render() {

        const { category } = this.props;

        if(category) {return (
            <Query 
                query={PRODUCTS_BY_CATEGORY_QUERY} 
                variables={{categoryId: category}}
            >
                {({ loading, error, data }) => {
                    if(loading) return <Loading />
                    if(error) return <p>{error.message}</p>

                    return (
                        <ul>
                            {data.productsByCategory.map(product => {
                                return <li key={product.id}>{product.name}</li>
                            })}
                        </ul>
                    );
                }}
            </Query>
        )} else {return (
            <Query
                query={PRODUCTS_QUERY}
            >
                {({loading, error, data}) => {
                    if(loading) return <Loading />
                    if(error) return <p>{error.message}</p>

                    return (
                        <div className="product-container">
                            {data.products.map(product => {
                                return(
                                    <div key={product.id} className="item">
                                        <span>{product.name}</span>
                                        <img src="https://via.placeholder.com/300" alt="product" />
                                        <div className="item-footer">
                                            <span>Cena: <strong>{product.price}</strong> PLN</span>
                                            <Link className="btn btn-primary" to={`/products/${product.id}`} >Więcej</Link>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    );
                }}
            </Query>
        )}
    }
}

export default ProductsList;
