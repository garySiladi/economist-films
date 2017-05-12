// @flow
import React from 'react';
import { mount, shallow } from 'enzyme';
import VideoPlayer from './video-player';

test('renders correctly', () => {
  const videoPlayer = mount(
    <VideoPlayer
      videoUrl="https://cdn-films.economist.com/DW/MAY01_REV/MTMYSCivil.m3u8"
      showUI
      posterImage={null}
      isMuted={false}
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
    />);
  const vP: Object = videoPlayer.instance();
  vP.player = null;
  videoPlayer.unmount();
});
test('Test functions', () => {
  const videoPlayer = shallow(
    <VideoPlayer
      videoUrl="https://cdn-films.economist.com/DW/MAY01_REV/MTMYSCivil.m3u8"
      showUI
      posterImage={null}
      isMuted={false}
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
  vP.handlePlayPause();
  expect(videoPlayer.state().isVideoPlaying).toEqual(true);
  vP.handlePlayPause();
  expect(videoPlayer.state().isVideoPlaying).toEqual(false);
  vP.handleFastForward();
  expect(videoPlayer.state().isNavigationSelected).toEqual(true);
  vP.moveLeft();
  expect(videoPlayer.state().selectedPosition).toEqual(0);
  expect(vP.player.currentTime()).toEqual(20);
  vP.handleFastForward();
  expect(vP.player.currentTime()).toEqual(20);
  vP.handleRewind();
  expect(vP.player.currentTime()).toEqual(20);
  vP.handleEndReached();
  expect(videoPlayer.state().isVideoPlaying).toEqual(false);
  expect(vP.player.currentTime()).toEqual(20);
  vP.handleTimeUpdate();
  expect(videoPlayer.state().timeProgress).toEqual(40);
  vP.moveLeft();
});
function connectEvent(event, type, wrapper) {
  const changedEvent: Object = event;
  changedEvent.key = type;
  const app: Object = wrapper.instance();
  app.handleKeyPress(event);
}
test('videoPlayer navigation works', () => {
  const app = mount(
    <VideoPlayer
      videoUrl="https://cdn-films.economist.com/DW/MAY01_REV/MTMYSCivil.m3u8"
      showUI
      posterImage={null}
      isMuted={false}
    />);
  expect(app.state().isNavigationSelected).toEqual(true);
  const event = new Event('keyDown');
  connectEvent(event, 'ArrowUp', app);
  expect(app.state().isNavigationSelected).toEqual(false);
  expect(app.state().isBackButtonSelected).toEqual(true);
  connectEvent(event, 'ArrowDown', app);
  expect(app.state().isNavigationSelected).toEqual(true);
  expect(app.state().isBackButtonSelected).toEqual(false);
  expect(app.state().selectedPosition).toEqual(1);
  connectEvent(event, 'ArrowRight', app);
  expect(app.state().selectedPosition).toEqual(2);
  connectEvent(event, 'ArrowLeft', app);
  expect(app.state().selectedPosition).toEqual(1);
  connectEvent(event, 'ArrowLeft', app);
  expect(app.state().selectedPosition).toEqual(0);
  connectEvent(event, 'ArrowRight', app);
  expect(app.state().selectedPosition).toEqual(1);
  connectEvent(event, 'ArrowUp', app);
  expect(app.state().isBackButtonSelected).toEqual(true);
  expect(app.state().isNavigationSelected).toEqual(false);
  connectEvent(event, 'Enter', app);
  jest.fn(() => {});
  connectEvent(event, 'ArrowDown', app);
  expect(app.state().isNavigationSelected).toEqual(true);
  connectEvent(event, 'ArrowRight', app);
  expect(app.state().selectedPosition).toEqual(2);
  connectEvent(event, 'Enter', app);
  jest.fn(() => {});
  connectEvent(event, 'ArrowLeft', app);
  expect(app.state().selectedPosition).toEqual(1);
  connectEvent(event, 'Enter', app);
  jest.fn(() => {});
  connectEvent(event, 'ArrowLeft', app);
  expect(app.state().selectedPosition).toEqual(0);
  connectEvent(event, 'Enter', app);
  jest.fn(() => {});
  connectEvent(event, 'Backspace', app);
  jest.fn(() => {});
  expect(app.state().isNavigationSelected).toEqual(true);
  expect(app.state().isBackButtonSelected).toEqual(false);
  connectEvent(event, 'Space', app);
});
