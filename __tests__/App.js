import React from 'react';
import App from '../App';

import renderer from 'react-test-renderer';

test('renders correctly', ()=>{
  debugger;
  const tree = renderer.create(<App />).toJSON();
  expect (tree).toMatchSnapshot();
});