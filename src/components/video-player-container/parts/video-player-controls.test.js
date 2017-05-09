// @flow
import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import VideoPlayerControls from './video-player-controls';

// test('VideoPlayerControls renders correctly when isVideoPlaying is true', () => {
//   const tree : string =
//   renderer.create(
//     <VideoPlayerControls
//       playVideo={() => {}}
//       pauseVideo={() => {}}
//       fastForward={() => {}}
//       fastRewind={() => {}}
//       isVideoPlaying
//       isControlSelected
//       progress={0}
//     />).toJSON();
//   expect(tree).toMatchSnapshot();
// });
//
// test('VideoPlayerControls renders correctly when isVideoPlaying is false', () => {
//   const tree : string =
//   renderer.create(
//     <VideoPlayerControls
//       playVideo={() => {}}
//       pauseVideo={() => {}}
//       fastForward={() => {}}
//       fastRewind={() => {}}
//       isVideoPlaying={false}
//       isControlSelected={false}
//       progress={0}
//     />).toJSON();
//   expect(tree).toMatchSnapshot();
// });

function connectEvent(event, type, wrapper, handleFunction) {
  const changedEvent: Object = event;
  changedEvent.key = type;
  const app: Object = wrapper.instance();
  if (handleFunction === 'handleKeyPress') {
    app.handleKeyPress(event);
  }
}
test('videoPlayerControls navigation works', () => {
  const app = mount(
    <VideoPlayerControls
      playVideo={() => {}}
      pauseVideo={() => {}}
      fastForward={() => {}}
      fastRewind={() => {}}
      isVideoPlaying={true}
      isControlSelected={true}
      progress={0}
    />);
  const event = new Event('keyDown');
  expect(app.props().isControlSelected).toEqual(true);
  connectEvent(event, 'ArrowLeft', app, 'handleKeyPress');
  connectEvent(event, 'ArrowRight', app, 'handleKeyPress');
  connectEvent(event, 'Enter', app, 'handleKeyPress');
  connectEvent(event, 'Space', app, 'handleKeyPress');
});
test('videoPlayerControls navigation works', () => {
  const app = mount(
    <VideoPlayerControls
      playVideo={() => {}}
      pauseVideo={() => {}}
      fastForward={() => {}}
      fastRewind={() => {}}
      isVideoPlaying={false}
      isControlSelected={true}
      progress={0}
    />);
  const event = new Event('keyDown');
  expect(app.props().isControlSelected).toEqual(true);
  expect(app.props().isVideoPlaying).toEqual(false);
  connectEvent(event, 'ArrowLeft', app, 'handleKeyPress');
  connectEvent(event, 'ArrowRight', app, 'handleKeyPress');
  connectEvent(event, 'Enter', app, 'handleKeyPress');
  connectEvent(event, 'Space', app, 'handleKeyPress');
});
test('videoPlayerControls navigation works', () => {
  const app = mount(
    <VideoPlayerControls
      playVideo={() => {}}
      pauseVideo={() => {}}
      fastForward={() => {}}
      fastRewind={() => {}}
      isVideoPlaying={true}
      isControlSelected={false}
      progress={0}
    />);
  const event = new Event('keyDown');
  expect(app.props().isControlSelected).toEqual(false);
  connectEvent(event, 'ArrowLeft', app, 'handleKeyPress');
  connectEvent(event, 'ArrowRight', app, 'handleKeyPress');
  connectEvent(event, 'Enter', app, 'handleKeyPress');
  expect(app.props().isVideoPlaying).toEqual(true);
  connectEvent(event, 'Space', app, 'handleKeyPress');
});
