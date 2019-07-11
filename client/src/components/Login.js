import React from 'react';
import { Redirect } from 'react-router-dom';

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

    loginHandler = (e) => {
        e.preventDefault();

        this.setState({ isRedirect: true });
        
        const { login, pass } = this.state; 
        this.props.loginHandler(login, pass);
    }
    
    render()
    {
        return(
            <form className="login-form" onSubmit={this.loginHandler}>
                {(this.state.isRedirect) ? <Redirect to="/" /> : null }
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
        );
    }
}

export default Login;