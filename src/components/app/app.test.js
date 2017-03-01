// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import App from './app';

test('App renders correctly', () => {
  const tree : string = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});
