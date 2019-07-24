import React, { Component } from 'react'
import { Query } from 'react-apollo';
import Dropzone from 'react-dropzone';

import Loading from './Loading';

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
                            if(loading) return <Loading />
                            if(error) return <p>{error.message}</p>

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
                    <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
                        {({getRootProps, getInputProps}) => (
                            <section>
                            <div {...getRootProps()}>
                                <input {...getInputProps()} />
                                <p>Drag 'n' drop some files here, or click to select files</p>
                            </div>
                            </section>
                        )}
                    </Dropzone>
                </div>
                <div className="form-control">
                    <button type="submit" className="btn btn-success">Zapisz</button>
                </div>
            </form>
        )
    }
}

export default AddProductForm;
