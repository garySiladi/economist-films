// @flow
import React from 'react';
import { mount, shallow } from 'enzyme';
import VideoPlayer from './video-player';

test('renders correctly', () => {
  const videoPlayer = mount(<VideoPlayer videoUrl="https://cdn-films.economist.com/DW/MAY01_REV/MTMYSCivil.m3u8" />);
  videoPlayer.unmount();
});
test('does not break on unmount', () => {
  const videoPlayer = mount(<VideoPlayer videoUrl="https://cdn-films.economist.com/DW/MAY01_REV/MTMYSCivil.m3u8" />);
  const vP: Object = videoPlayer.instance();
  vP.player = null;
  videoPlayer.unmount();
});
test('Test functions', () => {
  const videoPlayer = shallow(<VideoPlayer videoUrl="https://cdn-films.economist.com/DW/MAY01_REV/MTMYSCivil.m3u8" />);
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
  vP.handleEndReached();
  expect(videoPlayer.state().isVideoPlaying).toEqual(false);
  expect(vP.player.currentTime()).toEqual(20);
  vP.handleTimeUpdate();
  expect(videoPlayer.state().timeProgress).toEqual(40);
});
