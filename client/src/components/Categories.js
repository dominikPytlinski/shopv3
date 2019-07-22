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
                            <div className="category-list">
                                <div onClick={(e) => {this.props.products(null)}}>Wszystkie</div>
                                {data.categories.map(category => {
                                    return <div key={category.id} onClick={(e) => {this.props.products(category.id)}}>{category.name}</div>
                                })}
                            </div>
                        )
                    }
                }
            </Query>
        )
    }
}

export default Categories
