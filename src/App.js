import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import { Provider } from 'react-redux';
import store from './store';
import { setAuthToken, TOKEN } from './utils';

import './App.scss';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
const DefaultLayout = Loadable({
  loader: () => import('./containers/DefaultLayout'),
  loading
});

// Pages
const Login = Loadable({
  loader: () => import('./components/Login'),
  loading
});

const Register = Loadable({
  loader: () => import('./views/Pages/Register'),
  loading
});

if(localStorage.getItem(TOKEN)) {
  setAuthToken(localStorage.getItem(TOKEN));
}

class App extends Component {

  render() {
    return (
      <Provider store = { store }>
        <BrowserRouter>
            <Switch>
              <Route exact path="/login" name="Login Page" component={Login} />
              <Route exact path="/register" name="Register Page" component={Register} />
              <Route path="/" name="Home" component={DefaultLayout} />
            </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
