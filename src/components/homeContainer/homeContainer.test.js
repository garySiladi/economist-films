// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import HomeContainer from './homeContainer';

test('HomeContainer renders correctly', () => {
  const tree : string = renderer.create(<HomeContainer />).toJSON();
  expect(tree).toMatchSnapshot();
});
