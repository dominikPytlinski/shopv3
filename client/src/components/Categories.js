import React, { Component } from 'react'
import { Query } from 'react-apollo';

import Loading from './Loading';

import { CATEGORIES_QUERY } from '../queries/Queries';

class Categories extends Component {

    categorySelectedHandler = (e) => {
        console.log(e.target);
    }

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
                                        return <li onClick={this.categorySelectedHandler} key={category.id} >{category.name}</li>
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
