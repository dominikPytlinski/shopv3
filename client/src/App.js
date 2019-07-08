import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './components/Header';
import Login from './components/Login';

import './App.css';

class App extends React.Component {
  render() {
    return(
      <React.Fragment>
        <BrowserRouter>
          <Header />
          <Route path="/login" exact component={Login} />
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

export default App;
