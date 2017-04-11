// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import EpisodeDetailContainer from './episode-detail-container';


test('EpisodeDetailContainer renders correctly', () => {
  const tree: string = renderer.create(<EpisodeDetailContainer params />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('EpisodeDetailContainer renders correctly', () => {
  const episode = {
    thumbnail: {
      url: 'xxx',
    },
  };
  const tree: string = renderer.create(
    EpisodeDetailContainer.createEpisodeCard(episode, 1)
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Error is thrown properly', () => {
  expect(EpisodeDetailContainer.throwError(5)).toBe(5);
});
