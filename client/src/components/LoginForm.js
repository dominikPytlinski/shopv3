import React, { Component } from 'react';

class LoginForm extends Component {
    
    constructor(props)
    {
        super(props);
        this.state = {
            login: '',
            password: ''
        }
    }

    loginHandler = (e) => {
        e.preventDefault();
        this.props.login({
            variables: {
                email: this.state.login,
                password: this.state.password
            }
        });
    }

    render() {
        return (
            <form className="login-form" onSubmit={this.loginHandler} >
                <div className="form-control">
                    <label htmlFor="login">Login: </label>
                    <input type="text" id="login" value={this.state.login} onChange={(e) => {this.setState({ login: e.target.value })}} />
                </div>
                <div className="form-control">
                    <label htmlFor="pass">Hasło: </label>
                    <input type="password" id="pass" value={this.state.password} onChange={(e) => {this.setState({ password: e.target.value })}} />
                </div>
                <button type="submit">Zaloguj</button>
            </form>
        )
    }
}

export default LoginForm
