// @flow
import React from 'react';
import { mount, shallow } from 'enzyme';
import VideoPlayer from './video-player';
import * as storage from '../../../api/local-storage';

test('renders correctly', () => {
  const videoPlayer = mount(
    <VideoPlayer
      videoUrl="https://cdn-films.economist.com/DW/MAY01_REV/MTMYSCivil.m3u8"
      showUI
      posterImage={null}
      isMuted={false}
      videoID={5}
    />);
  videoPlayer.unmount();
});
test('does not break on unmount', () => {
  const videoPlayer = mount(
    <VideoPlayer
      videoUrl="https://cdn-films.economist.com/DW/MAY01_REV/MTMYSCivil.m3u8"
      showUI={false}
      posterImage={null}
      isMuted={false}
      videoID={5}
    />);
  const vP: Object = videoPlayer.instance();
  vP.player = null;
  videoPlayer.unmount();
});
test('Test functions', () => {
  // $FlowFixMe
  storage.getProgressTimeById = jest.fn(() => 10);
  const videoPlayer = shallow(
    <VideoPlayer
      videoUrl="https://cdn-films.economist.com/DW/MAY01_REV/MTMYSCivil.m3u8"
      showUI
      posterImage={null}
      isMuted={false}
      videoID={5}
    />);
  expect(videoPlayer.state().isVideoPlaying).toEqual(true);
  const vP: Object = videoPlayer.instance();
  vP.player = {
    play: jest.fn(),
    pause: jest.fn(),
    dispose: jest.fn(),
    remainingTime: jest.fn().mockReturnValueOnce(100).mockReturnValue(5),
    currentTime: jest.fn(() => 20),
    duration: jest.fn(() => 50),
  };
  expect(VideoPlayer.getProgress(vP.player)).toEqual(40);
  vP.handlePlay();
  expect(videoPlayer.state().isVideoPlaying).toEqual(true);
  vP.handlePause();
  expect(videoPlayer.state().isVideoPlaying).toEqual(false);
  vP.handleFastForward();
  expect(vP.player.currentTime()).toEqual(20);
  vP.handleFastForward();
  expect(vP.player.currentTime()).toEqual(20);
  vP.handleRewind();
  expect(vP.player.currentTime()).toEqual(20);
  vP.handleVideoLoad();
  vP.handleEndReached();
  expect(videoPlayer.state().isVideoPlaying).toEqual(false);
  expect(vP.player.currentTime()).toEqual(20);
  vP.handleTimeUpdate();
  expect(videoPlayer.state().timeProgress).toEqual(40);
});
function connectEvent(event, type, wrapper) {
  const changedEvent: Object = event;
  changedEvent.key = type;
  const app: Object = wrapper.instance();
  app.handleNavigationState(event);
}
test('renderTime renders time correctly if minutes and seconds > 10', () => {
  expect(VideoPlayer.renderTime(999)).toEqual('16:39');
});
test('videoPlayer navigation works', () => {
  const app = mount(
    <VideoPlayer
      videoUrl="https://cdn-films.economist.com/DW/MAY01_REV/MTMYSCivil.m3u8"
      showUI
      posterImage={null}
      isMuted={false}
      videoID={5}
    />);
  expect(app.state().isControlSelected).toEqual(true);
  const event = new Event('keyDown');
  connectEvent(event, 'ArrowUp', app);
  expect(app.state().isControlSelected).toEqual(false);
  connectEvent(event, 'ArrowDown', app);
  expect(app.state().isControlSelected).toEqual(true);
  connectEvent(event, 'Enter', app);
  expect(app.state().isControlSelected).toEqual(true);
  connectEvent(event, 'Space', app);
  connectEvent(event, 'ArrowUp', app);
  connectEvent(event, 'Enter', app);
  jest.fn(() => {});
  connectEvent(event, 'Backspace', app);
  jest.fn(() => {});
  expect(app.state().isControlSelected).toEqual(false);
});
