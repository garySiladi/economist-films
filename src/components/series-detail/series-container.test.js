// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import SeriesContainer from './series-container';

test('renders correctly', () => {
  const tree : string = renderer.create(<SeriesContainer />).toJSON();
  expect(tree).toMatchSnapshot();
});
