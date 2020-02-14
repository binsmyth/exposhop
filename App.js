//React native version - 0.59.10
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import {createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';//thunk

import ProductReducer from './ProductReducer';
import AppNavigator from './AppNavigator';

const store = createStore(
    ProductReducer,
    applyMiddleware(thunk)
  );

export default class App extends Component {
  render() {
    return (
      <Provider store={ store }>
          <AppNavigator />
      </Provider>
    );
  }
}