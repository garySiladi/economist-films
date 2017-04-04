// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import HomeContainer from './home-container';

test('HomeContainer renders correctly', () => {
  const tree : string = renderer.create(<HomeContainer />).toJSON();
  expect(tree).toMatchSnapshot();
});
