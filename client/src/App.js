import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { gql } from 'apollo-boost';

import Header from './components/Header';
import Login from './components/Login';
import { SetIntoStorage } from './helpers/Storage';

import './App.css';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});

class App extends React.Component {

  loginHandler = (login, pass) => {
    client.query({
      query: gql`
        {
          login(email: "${login}", password: "${pass}"){
            token
            expiry
            userId
            role{
              role
            }
          }
        }
      `
    }).then(res => {
      const data = res.data.login;

      SetIntoStorage({
        userId: data.userId,
        token: data.token,
        expiry: data.expiry,
        role: data.role.role
      }, 'auth', 'session');
    })
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
