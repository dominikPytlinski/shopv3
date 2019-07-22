import React, { Component } from 'react'
import { Query } from 'react-apollo';

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
                        <ul>
                            {data.products.map(product => {
                                return <li key={product.id}>{product.name}</li>
                            })}
                        </ul>
                    );
                }}
            </Query>
        )}
    }
}

export default ProductsList;
