import React, { Component } from 'react'
import { Query } from 'react-apollo';

import Loading from './Loading';

import { CATEGORIES_QUERY } from '../queries/Queries';

class Categories extends Component {

    render() {
        return (
            <Query query={CATEGORIES_QUERY} >
                {
                    ({ data, loading, error }) => {
                        if(loading) return <Loading />
                        if(error) return <p>{error.message}</p>

                        return (
                            <ul className="category-list">
                                {
                                    data.categories.map(category => {
                                        return <li onClick={(e) => {this.props.products(category.id)}} key={category.id} >{category.name}</li>
                                    })
                                }
                            </ul>
                        )
                    }
                }
            </Query>
        )
    }
}

export default Categories
