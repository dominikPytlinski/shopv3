import React, { Component } from 'react'
import { Query } from 'react-apollo';

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
                {(loading, error, data) => {
                    if(loading) return <Loading />
                    if(error) return <p>{error.message}</p>

                    return(
                        console.log(data)
                    );
                }}
            </Query>
        )
    }
}

export default SingleProduct;
