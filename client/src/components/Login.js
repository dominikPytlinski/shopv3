import React from 'react';
// import { Redirect } from 'react-router-dom';
import { ApolloConsumer, Mutation } from 'react-apollo'
import gql from 'graphql-tag';

const USER_LOGIN = gql`
    mutation{
        login(email: "test@test.pl", password: "test"){
            token
        }
    }
`;

class Login extends React.Component {
    
    constructor(props)
    {
        super(props);
        this.state = {
            login: '',
            pass: '',
            isRedirect: false
        }
    }
    
    render()
    {
        return(
            <ApolloConsumer>
                {client => (
                    <Mutation
                        mutation={USER_LOGIN}
                        onCompleted={({ login }) => {
                            console.log(login);
                        }}
                    >
                        { (login, { loading, error }) => {
                            if(loading) return <div>Loading...</div>
                            if(error) return <div>Error</div>

                            return (
                                <form className="login-form" onSubmit={login}>
                                    {/* {(this.state.isRedirect) ? <Redirect to="/" /> : null } */}
                                    <div className="form-control">
                                        <label htmlFor="login">Login: </label>
                                        <input type="text" id="login" value={this.state.login} onChange={(e) => this.setState({ login: e.target.value })} />
                                    </div>
                                    <div className="form-control">
                                        <label htmlFor="pass">Hasło: </label>
                                        <input type="password" id="pass" value={this.state.pass} onChange={(e) => this.setState({ pass: e.target.value })} />
                                    </div>
                                    <button type="submit">Zaloguj</button>
                                </form>
                            )
                        }}
                    </Mutation>
                )}
            </ApolloConsumer>
        );
    }
}

export default Login;