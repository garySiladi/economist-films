// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import { getSeriesByID, getEpisodeByID } from '../../api/fetch';
import EpisodeDetailContainer from './episode-detail-container';

test('EpisodeDetailContainer renders correctly', () => {
  const tree : string = renderer.create(<EpisodeDetailContainer params />).toJSON();
  expect(tree).toMatchSnapshot();
});
