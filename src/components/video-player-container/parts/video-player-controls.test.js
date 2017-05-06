// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import VideoPlayerControls from './video-player-controls';

test('VideoPlayerControls renders correctly when isVideoPlaying is true', () => {
  const tree : string =
  renderer.create(
    <VideoPlayerControls
      playVideo = {() => {}}
      pauseVideo = {() => {}}
      fastForward = {() => {}}
      fastRewind = {() => {}}
      isVideoPlaying
      progress = {0}
    />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('VideoPlayerControls renders correctly when isVideoPlaying is false', () => {
  const tree : string =
  renderer.create(
    <VideoPlayerControls
      playVideo = {() => {}}
      pauseVideo = {() => {}}
      fastForward = {() => {}}
      fastRewind = {() => {}}
      isVideoPlaying = {false}
      progress = {0}
    />).toJSON();
  expect(tree).toMatchSnapshot();
});
