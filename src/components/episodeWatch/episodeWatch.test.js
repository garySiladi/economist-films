// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import EpisodeWatch from './episodeWatch';

test('EpisodeWatch renders correctly', () => {
  const tree : string = renderer.create(<EpisodeWatch />).toJSON();
  expect(tree).toMatchSnapshot();
});