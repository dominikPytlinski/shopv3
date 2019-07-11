import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { gql } from 'apollo-boost';

import Header from './components/Header';
import Login from './components/Login';

import './App.css';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});

class App extends React.Component {

  constructor(props)
  {
    super(props);
    this.state = {
      login: '',
      pass: ''
    }
  }
  
  loginHandler = (login, pass) => {
    this.setState({
      login: login,
      pass: pass
    });
  }

  render()
  {
    return(
      <ApolloProvider client={client}>
        <React.Fragment>
          <BrowserRouter>
            <Header />
            <Route 
              path="/login" exact 
              render={() => <Login loginHandler={this.loginHandler} />} 
            />
          </BrowserRouter>
        </React.Fragment>
      </ApolloProvider>
    );
  }
}

export default App;
