import React from 'react';
import App from '../App';
import Cart from '../Cart';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import renderer from 'react-test-renderer';
import ProductItems from '../ProductItems';

const mockStore = configureStore([]);
jest.useFakeTimers();
jest.mock('react-native-reanimated', () => require('react-native-reanimated/mock'));
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

test('renders correctly', ()=>{
  const app = renderer.create(<App />);
  const tree = app.toJSON();
  expect (tree).toMatchSnapshot();
});


//Solved using this url: https://www.robinwieruch.de/react-connected-component-test
test('renders correctly', ()=>{
  let store;
  let component;

  const addedProducts = {
    "WordPress Pennant":{
      "count": 1,
      "price": "11.05",
    },
    "total": 1,
  };

  beforeEach(()=>{
    store = mockStore({
      product: {
        addedProducts: addedProducts
      }
    });

    component = renderer.create(
      <Provider store={store}>
        <Cart/>
      </Provider>
    )

    const tree = component.toJSON();
    expect (tree).toMatchSnapshot();
  });
});

test('renders correctly', ()=>{
  let store;
  let component;

  beforeEach(()=>{
    store = mockStore({
      myState: 'sample text',
    });

    component = renderer.create(
      <Provider store={store}>
        <ProductItems />
      </Provider>
    )

    const tree = component.toJSON();
    expect (tree).toMatchSnapshot();
  });
});
