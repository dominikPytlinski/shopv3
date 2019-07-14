import React from 'react';
import { NavLink } from 'react-router-dom';

class Header extends React.Component {

    logoutHandler = () => {
        this.props.logout(true);
    }
    
    setLinks = () => {
        if(!this.props.isLogged) {
            return (
                <ul>
                    <li>
                        <NavLink to="/" exact activeClassName="selected">Główna</NavLink>
                    </li>
                    <li>
                        <NavLink to="/products" activeClassName="selected">Produkty</NavLink>
                    </li>
                    <li>
                        <NavLink to="/login" activeClassName="selected">Login</NavLink>
                    </li>
                </ul>
            )
        } else {
            return (
                <ul>
                    <li>
                        <NavLink to="/" exact activeClassName="selected">Główna</NavLink>
                    </li>
                    <li>
                        <NavLink to="/products" activeClassName="selected">Produkty</NavLink>
                    </li>
                    <li>
                        <span onClick={this.logoutHandler} >Logout</span>
                    </li>
                </ul>
            )
        }
    }

    render(){
        return(
            <header>
                <div className="logo">
                    Company Name
                </div>
                {this.setLinks()}
            </header>
        );
    }
}

export default Header;