import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Logout extends Component {
    
    logoutHandler = () => {
        sessionStorage.clear();
        this.props.logout(true);
    }
    
    render() {
        return (
            <React.Fragment>
               {this.logoutHandler()} 
            </React.Fragment>
        )
    }
}

export default Logout
