// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import EpisodeDetail from './episode-detail';

test('EpisodeDetail renders correctly', () => {
  const tree : string = renderer.create(<EpisodeDetail />).toJSON();
  expect(tree).toMatchSnapshot();
});
