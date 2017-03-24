// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import EpisodeTile from './episodeTile';

test('EpisodeTile renders correctly', () => {
  const tree : string = renderer.create(<EpisodeTile />).toJSON();
  expect(tree).toMatchSnapshot();
});