// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import EpisodeTiles from './episodeTiles';

test('EpisodeTiles renders correctly', () => {
  const tree : string = renderer.create(<EpisodeTiles />).toJSON();
  expect(tree).toMatchSnapshot();
});