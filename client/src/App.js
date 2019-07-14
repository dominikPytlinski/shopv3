import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import Header from './components/Header';
import Login from './components/Login';
import Products from './components/Products';

import './App.css';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});

class App extends React.Component {
  
  constructor(props)
  {
    super(props);
    this.state = {
      isLogged: (sessionStorage.getItem('auth')) ? true : false
    }
  }

  login = (isLogged) => {
    if(isLogged) this.setState({ isLogged: true });
  }

  logout = (isLoggedOut) => {
    if(isLoggedOut) {
      this.setState({ isLogged: false });
      sessionStorage.clear();
    }
  }
  
  render()
  {
    return(
      <ApolloProvider client={client}>
        <React.Fragment>
          <BrowserRouter>
            <Header isLogged={this.state.isLogged} logout={this.logout} />
            <Route 
              path="/login" exact 
              render={() => <Login isLogged={this.state.isLogged} login={this.login} />}
            />
            <Route
              path="/products"
              component={Products}
            />
          </BrowserRouter>
        </React.Fragment>
      </ApolloProvider>
    );
  }
}

export default App;
