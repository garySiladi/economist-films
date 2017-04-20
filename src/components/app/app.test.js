// @flow
import React from 'react';
import { mount, shallow } from 'enzyme';
import App from './app';

const mockData = [
  {
    title: 'Ocean',
    items: [
      {
        id: 1,
        title: 'xxx',
        type: 'yyy',
      },
      {
        id: 2,
        title: 'aaa',
        type: 'bbb',
      },
    ],
  },
  {
    title: 'Some series',
    items: [
      {
        id: 32,
        title: 'asd',
        type: 'ttt',
      },
      {
        id: 54,
        title: 'aza',
        type: 'sds',
      },
    ],
  },
  {
    title: 'Recommended',
    items: [
      {
        id: 3,
        title: 'xxx',
        type: 'yyy',
      },
      {
        id: 4,
        title: 'aaa',
        type: 'bbb',
      },
    ],
  },
  {
    title: 'Featured',
  },
  {
    title: 'More in Economist',
  },
];

jest.mock('../side-panel/side-panel', () =>
  jest.fn(() => <div>Side Panel</div>),
);

jest.mock('../home-container/home-container', () =>
  jest.fn(() => <div>Home Container</div>),
);

function connectEvent(event, type, wrapper) {
  const changedEvent: Object = event;
  changedEvent.key = type;
  const app: Object = wrapper.instance();
  app.handleKeyPress(event);
}

describe('App: ', () => {
  test('homepage navigation works', () => {
    const app = mount(<App />);
    expect(app.state().isSelectedHomeContainer).toEqual(true);
    app.setState({ series: mockData });
    const event = new Event('keyDown');
    // we have the first episode of the first series selected [0,0]
    // we select the second episode of the first series [0,1]
    connectEvent(event, 'ArrowRight', app);
    expect(app.state().selectedEpisode).toEqual(1);
    // we start navigating down 2 positions
    connectEvent(event, 'ArrowDown', app);
    expect(app.state().selectedSeries).toEqual(1);
    connectEvent(event, 'ArrowDown', app);
    expect(app.state().selectedSeries).toEqual(2);
    // we push the ArrowDown button, but there is no place at the bottom to navigate
    connectEvent(event, 'ArrowDown', app);
    expect(app.state().selectedSeries).toEqual(2);
    // we navigate up 2 positions to [1,0]
    connectEvent(event, 'ArrowUp', app);
    connectEvent(event, 'ArrowUp', app);
    expect(app.state().selectedSeries).toEqual(0);
    // we try the upper bounds
    connectEvent(event, 'ArrowUp', app);
    expect(app.state().selectedSeries).toEqual(0);
    connectEvent(event, 'ArrowRight', app);
    expect(app.state().selectedEpisode).toEqual(1);
    // the Backspace button resets the selected episode
    connectEvent(event, 'Backspace', app);
    expect(app.state().selectedEpisode).toEqual(0);
    // if we navigate left from the first episode, we end up on the sidebar
    connectEvent(event, 'ArrowLeft', app);
    expect(app.state().isSelectedSidePanel).toEqual(true);
    // the backspace here does nothing
    connectEvent(event, 'Backspace', app);
    // for now it 'selects' the focused element
    connectEvent(event, 'Enter', app);
    // we navigate back to the homecontainer
    connectEvent(event, 'ArrowRight', app);
    expect(app.state().isSelectedSidePanel).toEqual(false);
    expect(app.state().isSelectedHomeContainer).toEqual(true);
    connectEvent(event, 'ArrowRight', app);
    expect(app.state().selectedEpisode).toEqual(1);
    connectEvent(event, 'ArrowLeft', app);
    expect(app.state().selectedEpisode).toEqual(0);
    // no functionaility, just need to cover all branches, default switch
    connectEvent(event, 'Shift', app);
    connectEvent(event, 'Enter', app);
  });
  test('mounts/unmounts', () => {
    const wrapper = shallow(<App />);
    wrapper.unmount();
  });
});
