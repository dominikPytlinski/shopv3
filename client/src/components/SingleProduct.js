import React, { Component, Fragment } from 'react'
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';

import Loading from './Loading';

import { PRODUCT_QUERY } from '../queries/Queries';

class SingleProduct extends Component {
    render() {

        const { id } = this.props.match.params;

        return (
            <Query
                query={PRODUCT_QUERY}
                variables={{ id }}
            >
                {({loading, error, data}) => {
                    if(loading) return <Loading />
                    if(error) return <p>{error.message}</p>

                    const { name, desc, price } = data.product;

                    return(
                        <Fragment>
                            <div className="single-product">
                                <div className="product-header">
                                    <span>{name}</span>
                                    <img src="https://via.placeholder.com/300" alt="product" />
                                </div>
                                <div className="product-body">
                                    <p>{desc}</p>
                                    <div>
                                        <span>Cena: <strong>{price}</strong> PLN</span>
                                        <button className="btn btn-success">Add to Cart</button>
                                    </div>
                                </div>
                            </div>
                            <div className="single-product-back">
                                <Link to="/products" className="btn btn-primary" >Produkty</Link>
                            </div>
                        </Fragment>
                    );
                }}
            </Query>
        )
    }
}

export default SingleProduct;
