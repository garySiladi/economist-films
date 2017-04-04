// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import EpisodeDescriptionContainer from './episode-description-container';

test('EpisodeDescriptionContainer renders correctly', () => {
  const tree : string = renderer.create(<EpisodeDescriptionContainer />).toJSON();
  expect(tree).toMatchSnapshot();
});