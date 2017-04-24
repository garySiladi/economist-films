// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import EpisodeSelected from './episode-selected';

jest.mock('./parts/episode-description', () =>
  jest.fn(() => <div>EpisodeDescription</div>),
);

test('EpisodeSelected renders with data', () => {
  const tree : string = renderer.create(<EpisodeSelected
    id={3}
    url="url xyz"
    title="title xyz"
    subtitle="subtitle xyz"
    description="description xyz"
  />).toJSON();
  expect(tree).toMatchSnapshot();
});
