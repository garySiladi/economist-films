// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import Home from './home';


test('Home renders correctly', () => {
  const tree : string = renderer.create(<Home />).toJSON();
  expect(tree).toMatchSnapshot();
});
