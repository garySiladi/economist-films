// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import * as fetches from '../../api/fetch';
import SeriesContainer from './series-container';

const dummySliderItems = {
  published_episodes: [
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
  ],
};

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

test('Series detail navigation works', () => {
  const seriesContainer = mount(
    <SeriesContainer
      params={{ id: 50 }}
      location={{
        query: {
          expandedEpisode: '',
        },
      }}
    />);
  expect(seriesContainer.state().selectedEpisode).toEqual(0);
});

function connectEvent(event, type, wrapper) {
  const changedEvent: Object = event;
  changedEvent.code = type;
  const seriesContainer: Object = wrapper.instance();
  seriesContainer.handleKeyPress(event);
}

test('Series detail navigation works', () => {
  const seriesContainer = mount(
    <SeriesContainer
      params={{ id: 50 }}
      location={{
        query: {
          expandedEpisode: '119',
        },
      }}
    />);
  const event = new Event('keyDown');
  seriesContainer.setState({ series: dummySliderItems });
  expect(seriesContainer.state().isSliderSelected).toEqual(true);
  expect(seriesContainer.state().isSideBarSelected).toEqual(false);
  expect(seriesContainer.state().selectedEpisode).toEqual(0);
  // [0,1]
  connectEvent(event, 'ArrowRight', seriesContainer);
  expect(seriesContainer.state().selectedEpisode).toEqual(1);
  connectEvent(event, 'ArrowRight', seriesContainer);
  // [0,1]
  expect(seriesContainer.state().selectedEpisode).toEqual(1);
  // [0,0]
  connectEvent(event, 'ArrowLeft', seriesContainer);
  expect(seriesContainer.state().selectedEpisode).toEqual(0);
  // sidePanel is selected
  connectEvent(event, 'ArrowLeft', seriesContainer);
  expect(seriesContainer.state().isSliderSelected).toEqual(false);
  expect(seriesContainer.state().isSideBarSelected).toEqual(true);
  expect(seriesContainer.state().goToEpisodeDetail).toEqual(false);
  // slider is selected
  connectEvent(event, 'ArrowRight', seriesContainer);
  expect(seriesContainer.state().isSliderSelected).toEqual(true);
  expect(seriesContainer.state().isSideBarSelected).toEqual(false);
  // show pop up
  connectEvent(event, 'Enter', seriesContainer);
  expect(seriesContainer.state().goToEpisodeDetail).toEqual(true);
  // unselect slider
  seriesContainer.setState({ isSliderSelected: false });
  // cant open pop up
  connectEvent(event, 'Enter', seriesContainer);
  connectEvent(event, 'Backspace', seriesContainer);
  jest.fn(() => {});
  connectEvent(event, 'Space', seriesContainer);
  const seriesContainerInstance: Object = seriesContainer.instance();
  seriesContainerInstance.handleReturnFromEpisode();
  seriesContainer.unmount();
});

test('Series fetch', () => {
  // $FlowFixMe
  fetches.getSeriesByID =
    jest.fn().mockImplementation(() => new Promise(resolve => resolve(dummySliderItems)));
  mount(
    <SeriesContainer
      params={{ id: 50 }}
      location={{
        query: {
          expandedEpisode: '141',
        },
      }}
    />);
  // $FlowFixMe
  expect(fetches.getSeriesByID.mock.calls.length).toEqual(1);
  mount(
    <SeriesContainer
      params={{ id: 50 }}
      location={{
        query: {
          expandedEpisode: '1415',
        },
      }}
    />);
  // $FlowFixMe
  expect(fetches.getSeriesByID.mock.calls.length).toEqual(2);
});
