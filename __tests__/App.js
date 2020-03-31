const { JSDOM } = require('jsdom');

const jsdom = new JSDOM('');
const { window } = jsdom;

function copyProps(src, target){
  Object.defineProperties(target,{
    ...Object.getOwnPropertyDescriptors(src),
    ...Object.getOwnPropertyDescriptors(target),
  });
}

global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: 'node.js',
};
global.requestAnimationFram = function(callback){
  return this.setTimeout(callback, 0);
};
global.cancelAnimationFram = function(id){
  this.clearTimeout(id);
};
copyProps(window,global);

import React from 'react';
import { View, Text } from 'react-native';
import App from '../App';
import Cart from '../Cart';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import renderer from 'react-test-renderer';
import {ProductItems} from '../ProductItems';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, {shallow, mount} from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
Enzyme.configure({ adapter: new Adapter() });


jest.useFakeTimers();
jest.mock('react-native-reanimated', () => require('react-native-reanimated/mock'));
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');
let checkRenderedComponent = function(component){
  const checkingComponent = renderer.create(component);
  const tree = checkingComponent.toJSON();
  expect (tree).toMatchSnapshot();
}

it('render',()=>{
  const mockStore = configureStore([thunk]);
  let store;
  
  store = mockStore({
    product:{
      "addedProducts":{},
      "isFetch":true,
      "product":[
        {
          "id":34,
          "images": "http://localhost:8000/wp-content/uploads/2020/02/pennant-1.jpg",
          "name": "WordPress Pennant",
          "price": "11.05", 
        },
        {
          "id":35,
          "images": "http://localhost:8000/wp-content/uploads/2020/02/pennant-1.jpg",
          "name": "WordPress Pennant",
          "price": "11.05", 
        },
      ]
    },
  });
  let fetchProducts = jest.fn();
  const productProps = {
    fetchProducts:fetchProducts,
    product:{
      isFetch:true
    }
  }
  const wrapper = shallow(<ProductItems {...productProps}/>);
  console.log(wrapper.instance().putProductsInRows())
});

//App component render test
// test('render App correctly', ()=>{
//   checkRenderedComponent(<App />);
// });

//Cart component render test
// //Solved using this url: https://www.robinwieruch.de/react-connected-component-test
// test('render Cart correctly', ()=>{
//   const mockStore = configureStore([]);
//   let store;

//   const addedProducts = {
//     "WordPress Pennant":{
//       "count": 1,
//       "price": "11.05",
//     },
//     "total": 1,
//   };

//   // beforeEach(()=>{
    
//   // });
//   store = mockStore({
//     product: {
//       addedProducts: addedProducts
//     },
//     isFetch:true
//   });
//   checkRenderedComponent(
//     <Provider store={store}>
//       <Cart />
//     </Provider>);
// });



// test('testing product item functions',()=>{
//   const mockStore = configureStore([thunk]);
//   let store;
  
//   store = mockStore({
//     product:{
//       "addedProducts":{},
//       "isFetch":true,
//       "product":[
//         {
//           "id":34,
//           "images": "http://localhost:8000/wp-content/uploads/2020/02/pennant-1.jpg",
//           "name": "WordPress Pennant",
//           "price": "11.05", 
//         },
//         {
//           "id":35,
//           "images": "http://localhost:8000/wp-content/uploads/2020/02/pennant-1.jpg",
//           "name": "WordPress Pennant",
//           "price": "11.05", 
//         },
//       ]
//     },
//   });
//   debugger;
//   const productItemFunc = renderer.create(<Provider store = {store}><ProductItems/></Provider>);
//   checkRenderedComponent(<Provider store = {store}><ProductItems/></Provider>)
//   const prod = productItemFunc.root;
//   console.log(productItemFunc.toJSON().children);
//   const prodItems = prod.findByType(Provider);
// });

