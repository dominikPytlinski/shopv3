import React from 'react';
import { Redirect } from 'react-router-dom';
import { Mutation } from 'react-apollo';

import LoginForm from './LoginForm';
import Loading from './Loading';

import { USER_LOGIN_MUTATION } from '../queries/Queries';

class Login extends React.Component { 
    
    constructor(props)
    {
        super(props);
        this.state = {
            isLogged: this.props.isLogged
        }
    }
    
    render()
    {
        return(
            <Mutation 
                mutation={USER_LOGIN_MUTATION}
                onCompleted={(data) => {
                    this.setState({ isLogged: true });
                    sessionStorage.setItem('auth', JSON.stringify({ role: data.login.role.role, token: data.login.token }));
                    this.props.login(true);
                }}
            >
                {
                    (login, {loading, error, data}) => {
                        if(loading) return <Loading />
                        if(error) return <p>{error.message}</p>

                        return this.state.isLogged ? <Redirect to="/" /> : <LoginForm login={login} />
                    }
                }
            </Mutation>
        );
    }
}

export default Login;