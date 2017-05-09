// @flow
import React from 'react';
import { mount } from 'enzyme';
import VideoPlayerControls from './video-player-controls';

function connectEvent(event, type, wrapper) {
  const changedEvent: Object = event;
  changedEvent.key = type;
  const app: Object = wrapper.instance();
  app.handleKeyPress(event);

}
test('videoPlayerControls navigation works', () => {
  const app = mount(
    <VideoPlayerControls
      playVideo={() => {}}
      pauseVideo={() => {}}
      fastForward={() => {}}
      fastRewind={() => {}}
      isVideoPlaying
      isControlSelected
      progress={0}
    />);
  const event = new Event('keyDown');
  expect(app.props().isControlSelected).toEqual(true);
  connectEvent(event, 'ArrowLeft', app);
  connectEvent(event, 'ArrowRight', app);
  connectEvent(event, 'Enter', app);
  connectEvent(event, 'Space', app);
});
test('videoPlayerControls navigation works', () => {
  const app = mount(
    <VideoPlayerControls
      playVideo={() => {}}
      pauseVideo={() => {}}
      fastForward={() => {}}
      fastRewind={() => {}}
      isVideoPlaying={false}
      isControlSelected
      progress={0}
    />);
  const event = new Event('keyDown');
  expect(app.props().isControlSelected).toEqual(true);
  expect(app.props().isVideoPlaying).toEqual(false);
  connectEvent(event, 'ArrowLeft', app);
  connectEvent(event, 'ArrowRight', app);
  connectEvent(event, 'Enter', app);
  connectEvent(event, 'Space', app);
});
test('videoPlayerControls navigation works', () => {
  const app = mount(
    <VideoPlayerControls
      playVideo={() => {}}
      pauseVideo={() => {}}
      fastForward={() => {}}
      fastRewind={() => {}}
      isVideoPlaying
      isControlSelected={false}
      progress={0}
    />);
  const event = new Event('keyDown');
  expect(app.props().isControlSelected).toEqual(false);
  connectEvent(event, 'ArrowLeft', app);
  connectEvent(event, 'ArrowRight', app);
  connectEvent(event, 'Enter', app);
  expect(app.props().isVideoPlaying).toEqual(true);
  connectEvent(event, 'Space', app);
});
