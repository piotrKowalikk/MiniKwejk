import * as React from 'react';
import { hot } from 'react-hot-loader';
import { BrowserRouter as Router, Switch, Route, BrowserRouter, HashRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux'
import { store } from '../redux/store';
import AppRouter from './AppRouter';

class App extends React.Component<{}, undefined> {

  public render() {
    return (
      <Provider store={store}>
        <AppRouter />
      </Provider>
    );
  }
}

declare let module: object;


export default hot(module)(App);
