// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import * as fetches from '../../api/fetch';
import SeriesContainer from './series-container';

const dummySliderItems = {
  title: 't1',
  description: 'aaa',
  additional_assets: [{
    key: 'eco_background',
    file: {
      url: 'xxx',
    },
  }, {
    key: 'eco_detail_logo',
    file: {
      url: 'yyy',
    },
  }, {
    key: 'eco_sponsor_logo',
    file: {
      url: 'zzz',
    },
  }],
  published_episodes: [{
    id: 119,
    title: 'Saving Corals',
    thumbnail: {
      url: 'https://cdn.twivel.io/uploads/economist/episode/thumbnail/119/episode_875X480.jpg',
    },
    type: 'Episode',
  }, {
    id: 141,
    title: 'The deep ocean is the final frontier on planet Earth',
    thumbnail: {
      url: 'https://cdn.twivel.io/uploads/economist/episode/thumbnail/141/episode_875X480.jpg',
    },
    type: 'Episode',
  }],
};


const dummySliderItemsWithoutKeys = {
  title: 't1',
  description: 'aaa',
  additional_assets: [
    {
      file: {
        url: 'xxx',
      },
    },
    {
      file: {
        url: 'yyy',
      },
    },
    {
      file: {
        url: 'zzz',
      },
    },
  ],
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

function connectEvent(event, type, wrapper) {
  const changedEvent: Object = event;
  changedEvent.code = type;
  const seriesContainer: Object = wrapper.instance();
  seriesContainer.handleKeyPress(event);
}

describe('SeriesContainer', () => {
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
  test('SeriesContainer renders without data', () => {
    const seriesContainer = mount(
      <SeriesContainer
        params={{ id: 50 }}
        location={{
          query: {
            expandedEpisode: '119',
          },
        }}
      />,
    );
    seriesContainer.setState({ series: dummySliderItemsWithoutKeys });
    const tree : string = renderer.create(
      <SeriesContainer
        params={{ id: 50 }}
        location={{
          query: {
            expandedEpisode: '119',
          },
        }}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('Series detail navigation works', () => {
    const seriesContainer = mount(
      <SeriesContainer
        params={{ id: 50 }}
        location={{
          query: {
            expandedEpisode: '119',
          },
        }}
      />,
    );
    const event = new Event('keyDown');
    seriesContainer.setState({ series: dummySliderItems });
    expect(seriesContainer.state().isSliderSelected).toEqual(true);
    expect(seriesContainer.state().selectedEpisode).toEqual(0);
    expect(seriesContainer.state().goToEpisodeDetail).toEqual(true);
    connectEvent(event, 'ArrowLeft', seriesContainer);
    // [0,0]
    connectEvent(event, 'ArrowRight', seriesContainer);
    expect(seriesContainer.state().selectedEpisode).toEqual(0);
    // [0,0]
    connectEvent(event, 'ArrowLeft', seriesContainer);
    expect(seriesContainer.state().selectedEpisode).toEqual(0);
    connectEvent(event, 'ArrowUp', seriesContainer);
    expect(seriesContainer.state().selectedEpisode).toEqual(0);
    connectEvent(event, 'ArrowDown', seriesContainer);
    expect(seriesContainer.state().selectedEpisode).toEqual(0);
    expect(seriesContainer.state().isSliderSelected).toEqual(true);
    expect(seriesContainer.state().selectedEpisode).toEqual(0);
    // watchnow button is selected
    connectEvent(event, 'ArrowUp', seriesContainer);
    connectEvent(event, 'ArrowUp', seriesContainer);
    expect(seriesContainer.state().isSliderSelected).toEqual(false);
    expect(seriesContainer.state().goToEpisodeDetail).toEqual(false);
    expect(seriesContainer.state().isWatchnowBtnSelected).toEqual(true);
    connectEvent(event, 'Enter', seriesContainer);
    connectEvent(event, 'ArrowDown', seriesContainer);
    connectEvent(event, 'ArrowDown', seriesContainer);
    expect(seriesContainer.state().goToEpisodeDetail).toEqual(true);
    jest.fn(() => {});
    connectEvent(event, 'Backspace', seriesContainer);
    connectEvent(event, 'ArrowUp', seriesContainer);
    expect(seriesContainer.state().goToEpisodeDetail).toEqual(false);
    connectEvent(event, 'ArrowRight', seriesContainer);
    connectEvent(event, 'ArrowUp', seriesContainer);
    connectEvent(event, 'ArrowLeft', seriesContainer);
    connectEvent(event, 'ArrowRight', seriesContainer);
    connectEvent(event, 'ArrowUp', seriesContainer);
    // slider is selected
    connectEvent(event, 'ArrowDown', seriesContainer);
    expect(seriesContainer.state().isSliderSelected).toEqual(true);
    expect(seriesContainer.state().goToEpisodeDetail).toEqual(false);
    expect(seriesContainer.state().isWatchnowBtnSelected).toEqual(false);
    // show pop up
    connectEvent(event, 'Enter', seriesContainer);
    expect(seriesContainer.state().isSliderSelected).toEqual(true);
    expect(seriesContainer.state().goToEpisodeDetail).toEqual(true);
    connectEvent(event, 'ArrowUp', seriesContainer);
    expect(seriesContainer.state().isSliderSelected).toEqual(true);
    expect(seriesContainer.state().goToEpisodeDetail).toEqual(false);
    connectEvent(event, 'ArrowDown', seriesContainer);
    expect(seriesContainer.state().isSliderSelected).toEqual(true);
    expect(seriesContainer.state().goToEpisodeDetail).toEqual(true);
    connectEvent(event, 'ArrowUp', seriesContainer);
    expect(seriesContainer.state().goToEpisodeDetail).toEqual(false);
    connectEvent(event, 'ArrowLeft', seriesContainer);
    expect(seriesContainer.state().selectedEpisode).toEqual(0);
    expect(seriesContainer.state().goToEpisodeDetail).toEqual(false);
    connectEvent(event, 'ArrowRight', seriesContainer);
    expect(seriesContainer.state().selectedEpisode).toEqual(1);
    connectEvent(event, 'ArrowRight', seriesContainer);
    connectEvent(event, 'ArrowLeft', seriesContainer);
    expect(seriesContainer.state().selectedEpisode).toEqual(0);
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
});
