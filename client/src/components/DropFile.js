import React, { Component } from 'react'
import Dropzone from 'react-dropzone';

class DropFile extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            innerDropZone: "Drag 'n' drop some files here, or click to select files"
        }
    }

    render()
    {
        return (
            <Dropzone onDrop={acceptedFiles => this.setState({ innerDropZone: acceptedFiles[0].name })}>
                {({getRootProps, getInputProps}) => (
                    <section>
                    <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <p>{this.state.innerDropZone}</p>
                    </div>
                    </section>
                )}
            </Dropzone>
        )
    }
}

export default DropFile;
