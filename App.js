import React, { Component } from 'react';
import { Provider } from 'react-redux';
import {createStore, applyMiddleware } from 'redux';
import ProductReducer from './ProductReducer';
import AppNavigator from './AppNavigator';
import thunk from 'redux-thunk';

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