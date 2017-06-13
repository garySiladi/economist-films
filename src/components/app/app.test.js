// @flow
import React from 'react';
import { mount, shallow } from 'enzyme';
import App from './app';

const mockData = [
  {
    title: 'Ocean',
    items: [
      {
        id: 0,
        title: 'zzz',
        type: 'Series',
      },
      {
        id: 1,
        title: 'xxx',
        type: 'Episode',
      },
      {
        id: 2,
        title: 'aaa',
        type: 'Episode',
      },
    ],
  },
  {
    title: 'Some series',
    items: [
      {
        id: 32,
        title: 'asd',
        type: 'Episode',
      },
      {
        id: 54,
        title: 'aza',
        type: 'Episode',
      },
    ],
  },
  {
    title: 'Recommended',
    items: [
      {
        id: 3,
        title: 'xxx',
        type: 'Episode',
      },
      {
        id: 4,
        title: 'aaa',
        type: 'Episode',
      },
    ],
  },
];

const mockDataWithUnwantedEpisodes = [
  {
    title: 'Wanted',
    id: 1,
  },
  {
    title: 'Unwanted 1',
    id: 11,
  },
  {
    title: 'Unwanted 2',
    id: 14,
  },
];

jest.mock('../side-panel/side-panel', () =>
  jest.fn(() => <div>Side Panel</div>),
);

jest.mock('../home-container/home-container', () =>
  jest.fn(() => <div>Home Container</div>),
);

function connectEvent(type, wrapper, handleFunction) {
  const app: Object = wrapper.instance();
  const event = new KeyboardEvent('', { code: type });
  if (handleFunction === 'handleKeyPress') {
    app.handleKeyPress(event);
  } else if (handleFunction === 'handleReturnFromEpisode') {
    app.handleReturnFromEpisode(event);
  }
}


describe('App: ', () => {
  test('homepage navigation works', () => {
    const app = mount(<App params={{}} />);
    const appInstance: Object = app.instance();
    expect(app.state().isSelectedHomeContainer).toEqual(true);
    app.setState({ series: mockData });
    // no functionaility, just need to cover all branches, default switch
    connectEvent('Shift', app, 'handleKeyPress');
    // we have the first episode of the first series selected [0,0]
    // we select the second episode of the first series [0,1]
    connectEvent('ArrowRight', app, 'handleKeyPress');
    expect(app.state().selectedEpisode).toEqual(1);
    // we start navigating down 2 positions
    connectEvent('ArrowDown', app, 'handleKeyPress');
    expect(app.state().selectedSeries).toEqual(1);
    connectEvent('ArrowDown', app, 'handleKeyPress');
    expect(app.state().selectedSeries).toEqual(2);
    // we push the ArrowDown button, but there is no place at the bottom to navigate
    connectEvent('ArrowDown', app, 'handleKeyPress');
    expect(app.state().selectedSeries).toEqual(2);
    // we navigate up 2 positions to [1,0]
    connectEvent('ArrowUp', app, 'handleKeyPress');
    connectEvent('ArrowUp', app, 'handleKeyPress');
    expect(app.state().selectedSeries).toEqual(0);
    // we try the upper bounds
    connectEvent('ArrowUp', app, 'handleKeyPress');
    expect(app.state().selectedSeries).toEqual(0);
    connectEvent('Enter', app, 'handleKeyPress');
    connectEvent('ArrowRight', app, 'handleKeyPress');
    expect(app.state().selectedEpisode).toEqual(1);
    appInstance.handleWheel({ deltaY: -5, preventDefault: () => {} });
    appInstance.handleWheel({ deltaY: 5, preventDefault: () => {} });
    // the Backspace button resets the selected episode
    connectEvent('Backspace', app, 'handleKeyPress');
    expect(app.state().selectedEpisode).toEqual(0);
    // if we navigate left from the first episode, we end up on the sidebar
    connectEvent('ArrowLeft', app, 'handleKeyPress');
    expect(app.state().isSelectedSidePanel).toEqual(true);
    appInstance.handleWheel({ deltaY: 5, preventDefault: () => {} });
    // the backspace here does nothing
    connectEvent('Backspace', app, 'handleKeyPress');
    // for now it 'selects' the focused element
    connectEvent('Enter', app, 'handleKeyPress');
    // we navigate back to the homecontainer
    connectEvent('ArrowRight', app, 'handleKeyPress');
    expect(app.state().isSelectedSidePanel).toEqual(false);
    expect(app.state().isSelectedHomeContainer).toEqual(true);
    connectEvent('ArrowRight', app, 'handleKeyPress');
    expect(app.state().selectedEpisode).toEqual(1);
    connectEvent('ArrowLeft', app, 'handleKeyPress');
    expect(app.state().selectedEpisode).toEqual(0);
    connectEvent('ArrowRight', app, 'handleKeyPress');
    connectEvent('Enter', app, 'handleKeyPress');
    expect(app.state().goToEpisode).toEqual(true);
    appInstance.handleWheel({ deltaY: 5, preventDefault: () => {} });
    // no functionaility, just need to cover all branches, default switch
    connectEvent('Shift', app, 'handleKeyPress');
    connectEvent('Enter', app, 'handleKeyPress');
    connectEvent('ArrowRight', app, 'handleKeyPress');
    connectEvent('ArrowRight', app, 'handleReturnFromEpisode');
    appInstance.handleHideSidebar(true);
    expect(app.state().isSidePanelHidden).toEqual(true);
  });
  test('function setEpisodeByParam() works', () => {
    const urlParams = {
      selectedEpisodeId: '32',
    };
    let output: ?Object = App.setEpisodeByParam(urlParams.selectedEpisodeId, mockData);
    expect(output).not.toBeNull();
    if (output) {
      expect(output.selectedSeries).toEqual(1);
      expect(output.selectedEpisode).toEqual(0);
      expect(output.goToEpisode).toEqual(true);
    }
    // test the searching function with non-existant episode ID
    output = App.setEpisodeByParam('100', mockData);
    expect(output).not.toBeNull();
    if (output) {
      expect(output.selectedSeries).toEqual(0);
      expect(output.selectedEpisode).toEqual(0);
      expect(output.goToEpisode).toEqual(false);
    }
  });
  test('mounts/unmounts', () => {
    const wrapper = shallow(<App params={{}} />);
    wrapper.unmount();
  });
});

test('removes Featured and More from the Economist from JSON', () => {
  const series = App.massageSeries(mockDataWithUnwantedEpisodes);
  expect(series).toEqual([
    mockDataWithUnwantedEpisodes[0],
  ]);
});
