// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import Home from './homeContainer';

test('homeContainer renders correctly', () => {
  const tree : string = renderer.create(<homeContainer />).toJSON();
  expect(tree).toMatchSnapshot();
});
