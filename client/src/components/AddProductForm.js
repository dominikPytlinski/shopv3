import React, { Component } from 'react'
import { Query } from 'react-apollo';

import DropFile from './DropFile';

import { CATEGORIES_QUERY } from '../queries/Queries';

class AddProductForm extends Component {
    
    constructor(props)
    {
        super(props);
        this.state = {
            file: null
        }
    }

    submitHandler = (e) => {
        e.preventDefault();
    } 
    
    render() {
        return (
            <form onSubmit={this.submitHandler}>
                <div className="form-control">
                    <input type="text" />
                </div>
                <div className="form-control">
                    <textarea></textarea>
                </div>
                <div className="form-control">
                    <input type="text" />
                </div>
                <div className="form-control">
                    <Query
                        query={CATEGORIES_QUERY}
                    >
                        {({loading,error,data}) => {
                            if(error) return <p>{error.message}</p>
                            if(loading) return(
                                <select>
                                    <option>Loading...</option>
                                </select>
                            );

                            return(
                                <select>
                                    {data.categories.map(category => {
                                        return <option key={category.id}>{category.name}</option>
                                    })}
                                </select>
                            );
                        }}
                    </Query>
                </div>
                <div className="form-control">
                    <DropFile />
                </div>
                <div className="form-control">
                    <button type="submit" className="btn btn-success">Zapisz</button>
                </div>
            </form>
        )
    }
}

export default AddProductForm;
