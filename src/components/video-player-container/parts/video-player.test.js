// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import { mount, shallow } from 'enzyme';
import VideoPlayer from './video-player';
require('videojs-contrib-hls/dist/videojs-contrib-hls.js');

describe('VideoPlayer', () => {
  test('renders correctly', () => {
    const videoPlayer = mount(<VideoPlayer videoUrl="https://cdn-films.economist.com/DW/MAY01_REV/MTMYSCivil.m3u8" />);
    videoPlayer.unmount();
  });
  test('renders correctly', () => {
      const videoPlayer = mount(<VideoPlayer videoUrl="" />);
  });
  // test('doesn\'t break on unmount', () => {
  //   const videoPlayer = mount(<VideoPlayer videoUrl="https://cdn-films.economist.com/DW/MAY01_REV/MTMYSCivil.m3u8" />);
  //   videoPlayer.instance().player  = null;
  //   videoPlayer.unmount();
  // });
  test('Test functions', () => {
    const videoPlayer = shallow(<VideoPlayer videoUrl="https://cdn-films.economist.com/DW/MAY01_REV/MTMYSCivil.m3u8" />);
    expect(videoPlayer.state().isVideoPlaying).toEqual(true);

    const vP: Object = videoPlayer.instance();
    vP.player = {
      play: jest.fn(),
      pause: jest.fn(),
      dispose: jest.fn(),
      time: 10,
      duration: 50,
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
    vP.handleOnLoad();
    expect(videoPlayer.state().isVideoPlaying).toEqual(false);
    vP.handleTimeUpdate();
    expect(videoPlayer.state().timeProgress).toEqual(40);
 });
});
