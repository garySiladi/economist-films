// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import EpisodeCardsContainer from './episode-cards-container';

test('EpisodeCardsContainer renders correctly', () => {
  const tree : string = renderer.create(<EpisodeCardsContainer />).toJSON();
  expect(tree).toMatchSnapshot();
});
