// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import VideoPlayerControls from './video-player-controls';

test('Video is playing + selected postition is 0', () => {
  const tree : string = renderer.create(
    <VideoPlayerControls
      isVideoPlaying
      selectedPosition={0}
      progress={0}
      currentTime={'10:10'}
      endOfVideo={'20:20'}
    />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Video is playing + selected postition is 1', () => {
  const tree : string = renderer.create(
    <VideoPlayerControls
      isVideoPlaying
      selectedPosition={1}
      progress={0}
      currentTime={'10:10'}
      endOfVideo={'20:20'}
    />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Video is playing + selected postition is 2', () => {
  const tree : string = renderer.create(
    <VideoPlayerControls
      isVideoPlaying
      selectedPosition={2}
      progress={0}
      currentTime={'10:10'}
      endOfVideo={'20:20'}
    />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Video is not playing ', () => {
  const tree : string = renderer.create(
    <VideoPlayerControls
      isVideoPlaying={false}
      selectedPosition={0}
      progress={0}
      currentTime={'10:10'}
      endOfVideo={'20:20'}
    />).toJSON();
  expect(tree).toMatchSnapshot();
});
