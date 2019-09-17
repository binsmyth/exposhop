import React, { Component } from 'react';
import { Provider } from 'react-redux';
import {createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';//thunk
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react'

import ProductReducer from './ProductReducer';
import AppNavigator from './AppNavigator';

const persistConfig = {
  key: "root",
  storage
};

const persistedReducer = persistReducer(persistConfig, ProductReducer);

const store = createStore(
    persistedReducer, 
    applyMiddleware(thunk)
  );

let persistor = persistStore(store);

export default class App extends Component {
  render() {
    return (
      <Provider store={ store }>
         <PersistGate loading={null} persistor={persistor}>
          <AppNavigator />
        </PersistGate>
      </Provider>
    );
  }
}