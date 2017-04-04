// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import EpisodeWatchContainer from './episode-watch-container';

test('EpisodeWatchContainer renders correctly', () => {
  const tree : string = renderer.create(<EpisodeWatchContainer />).toJSON();
  expect(tree).toMatchSnapshot();
});