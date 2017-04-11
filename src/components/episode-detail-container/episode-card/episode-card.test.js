// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import EpisodeCard from './episode-card';

test('EpisodeCard renders correctly', () => {
  const tree : string = renderer.create(<EpisodeCard />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('EpisodeCard renders with data', () => {
  const tree : string = renderer.create(<EpisodeCard url="http::ptth" />).toJSON();
  expect(tree).toMatchSnapshot();
});