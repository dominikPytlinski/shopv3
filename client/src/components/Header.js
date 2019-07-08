import React from 'react';
import { NavLink } from 'react-router-dom';

class Header extends React.Component {
    render(){
        return(
            <header>
                <div className="logo">
                    Company Name
                </div>
                <ul>
                    <li>
                        <NavLink to="/" exact activeClassName="selected">Główna</NavLink>
                    </li>
                    <li>
                        <NavLink to="/login" activeClassName="selected">Login</NavLink>
                    </li>
                    <li>
                        <NavLink to="/products" activeClassName="selected">Produkty</NavLink>
                    </li>
                </ul>
            </header>
        );
    }
}

export default Header;