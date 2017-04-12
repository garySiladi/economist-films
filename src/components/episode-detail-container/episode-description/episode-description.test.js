// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import EpisodeDescription from './episode-description';

test('EpisodeDescription renders correctly', () => {
  const tree : string = renderer.create(<EpisodeDescription />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('EpisodeDescription renders with data', () => {
  const tree : string = renderer.create(<EpisodeDescription
    title="some title"
    date="2011-11-11"
    description="something happened"
  />).toJSON();
  expect(tree).toMatchSnapshot();
});
