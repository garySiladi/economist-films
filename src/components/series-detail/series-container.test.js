// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import SeriesContainer from './series-container';

const dummySliderItems = [
  {
    title: 'Episode 1 Title',
    type: 'Episode 1',
  },
  {
    title: 'Episode 2 Title',
    type: 'Episode 2',
  },
];

test('renders correctly', () => {
  const tree : string = renderer.create(
    <SeriesContainer
      params={{ id: 50 }}
    />).toJSON();
  expect(tree).toMatchSnapshot();
});

function connectEvent(event, type, wrapper) {
  const changedEvent: Object = event;
  changedEvent.code = type;
  const app: Object = wrapper.instance();
  app.handleKeyPress(event);
}

test('Series detail navigation works', () => {
  const app = mount(
    <SeriesContainer
      params={{ id: 50 }}
    />);
  const event = new Event('keyDown');
  expect(app.state().isSliderSelected).toEqual(true);
  expect(app.state().selectedEpisode).toEqual(0);
  app.setState({ episodes: dummySliderItems });
  connectEvent(event, 'ArrowUp', app);
  connectEvent(event, 'ArrowDown', app);
  connectEvent(event, 'ArrowRight', app);
  expect(app.state().selectedEpisode).toEqual(1);
  connectEvent(event, 'ArrowRight', app);
  expect(app.state().selectedEpisode).toEqual(1);
  connectEvent(event, 'ArrowLeft', app);
  expect(app.state().selectedEpisode).toEqual(0);
  connectEvent(event, 'ArrowLeft', app);
  expect(app.state().selectedEpisode).toEqual(0);
  connectEvent(event, 'Space', app);
});
