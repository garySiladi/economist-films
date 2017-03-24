// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import EpisodeDescription from './episodeDescription';

test('EpisodeDescription renders correctly', () => {
  const tree : string = renderer.create(<EpisodeDescription />).toJSON();
  expect(tree).toMatchSnapshot();
});
