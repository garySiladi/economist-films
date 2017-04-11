// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import VideoPlayer from './video-player';

test('VideoPlayer renders correctly', () => {
  const tree : string = renderer.create(<VideoPlayer location={{ query: { id: 5 } }} />).toJSON();
  expect(tree).toMatchSnapshot();
});
