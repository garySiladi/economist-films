// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import EpisodeWatch from './episode-watch';

test('EpisodeWatch renders correctly', () => {
  const tree : string = renderer.create(<EpisodeWatch />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('EpisodeWatch renders with data', () => {
  const tree : string = renderer.create(<EpisodeWatch url="economist" />).toJSON();
  expect(tree).toMatchSnapshot();
});
