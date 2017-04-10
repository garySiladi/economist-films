// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import EpisodeDetailContainer from './episode-detail-container';

test('EpisodeDetailContainer renders correctly', () => {
  const tree : string = renderer.create(<EpisodeDetailContainer />).toJSON();
  expect(tree).toMatchSnapshot();
});
