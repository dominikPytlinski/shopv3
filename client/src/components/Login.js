import React from 'react';

class Login extends React.Component {
    
    constructor(props)
    {
        super(props);
        this.state = {
            login: '',
            pass: ''
        }
    }

    loginHandler = (e) => {
        e.preventDefault();
        
    }
    
    render()
    {
        return(
            <form className="login-form" onSubmit={this.loginHandler}>
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