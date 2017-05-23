// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import SeriesContainer from './series-container';

const dummySliderItems = [
  {
    id: 119,
    title: 'Saving Corals',
    thumbnail: {
      url: 'https://cdn.twivel.io/uploads/economist/episode/thumbnail/119/episode_875X480.jpg',
    },
    type: 'Episode',
  },
  {
    id: 141,
    title: 'The deep ocean is the final frontier on planet Earth',
    thumbnail: {
      url: 'https://cdn.twivel.io/uploads/economist/episode/thumbnail/141/episode_875X480.jpg',
    },
    type: 'Episode',
  },
];

jest.mock('../side-panel/side-panel', () =>
  jest.fn(() => <div>Side Panel</div>),
);

jest.mock('../episode-selected/episode-selected', () =>
  jest.fn(() => <div>Episode selected</div>),
);

test('renders correctly', () => {
  const tree : string = renderer.create(
    <SeriesContainer
      params={{ id: 50 }}
      location={{
        query: {
          expandedEpisode: '100',
        },
      }}
    />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders correctly without episodeID', () => {
  const tree : string = renderer.create(
    <SeriesContainer
      params={{ id: 50 }}
      location={{
        query: {
          expandedEpisode: '',
        },
      }}
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
      location={{
        query: {
          expandedEpisode: '119',
        },
      }}
    />);
  const event = new Event('keyDown');
  app.setState({ episodes: dummySliderItems });
  expect(app.state().isSliderSelected).toEqual(true);
  expect(app.state().isSideBarSelected).toEqual(false);
  expect(app.state().selectedEpisode).toEqual(0);
  // [0,1]
  connectEvent(event, 'ArrowRight', app);
  expect(app.state().selectedEpisode).toEqual(1);
  connectEvent(event, 'ArrowRight', app);
  // [0,1]
  expect(app.state().selectedEpisode).toEqual(1);
  // [0,0]
  connectEvent(event, 'ArrowLeft', app);
  expect(app.state().selectedEpisode).toEqual(0);
  // sidePanel is selected
  connectEvent(event, 'ArrowLeft', app);
  expect(app.state().isSliderSelected).toEqual(false);
  expect(app.state().isSideBarSelected).toEqual(true);
  expect(app.state().goToEpisodeDetail).toEqual(false);
  // slider is selected
  connectEvent(event, 'ArrowRight', app);
  expect(app.state().isSliderSelected).toEqual(true);
  expect(app.state().isSideBarSelected).toEqual(false);
  // show pop up
  connectEvent(event, 'Enter', app);
  expect(app.state().goToEpisodeDetail).toEqual(true);
  // unselect slider
  app.setState({ isSliderSelected: false });
  // cant open pop up
  connectEvent(event, 'Enter', app);
  connectEvent(event, 'Backspace', app);
  jest.fn(() => {});
  connectEvent(event, 'Space', app);
  const foundEpisode = SeriesContainer.findEpisode(dummySliderItems, '141');
  expect(foundEpisode).toEqual(1);
  const seriesContainer: Object = app.instance();
  seriesContainer.handleReturnFromEpisode();
  expect(app.state().goToEpisodeDetail).toEqual(false);
  app.unmount();
});
