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
    connectEvent(event, 'ArrowRight', app);
    expect(app.state().selectedEpisode).toEqual(1);
    connectEvent(event, 'ArrowDown', app);
    expect(app.state().selectedSeries).toEqual(1);
    connectEvent(event, 'ArrowDown', app);
    expect(app.state().selectedSeries).toEqual(2);
    connectEvent(event, 'ArrowDown', app);
    expect(app.state().selectedSeries).toEqual(2);
    connectEvent(event, 'ArrowDown', app);
    expect(app.state().selectedSeries).toEqual(2);
    connectEvent(event, 'ArrowUp', app);
    connectEvent(event, 'ArrowUp', app);
    expect(app.state().selectedSeries).toEqual(0);
    connectEvent(event, 'ArrowUp', app);
    expect(app.state().selectedSeries).toEqual(0);
    connectEvent(event, 'Backspace', app);
    expect(app.state().selectedEpisode).toEqual(0);
    connectEvent(event, 'ArrowLeft', app);
    expect(app.state().isSelectedSidePanel).toEqual(true);
    connectEvent(event, 'Backspace', app);
    connectEvent(event, 'Enter', app);
    connectEvent(event, 'ArrowRight', app);
    expect(app.state().isSelectedSidePanel).toEqual(false);
    connectEvent(event, 'ArrowRight', app);
    expect(app.state().selectedEpisode).toEqual(1);
    connectEvent(event, 'ArrowLeft', app);
    expect(app.state().selectedEpisode).toEqual(0);
    connectEvent(event, 'Shift', app);
    connectEvent(event, 'Enter', app);
  });
  test('mounts/unmounts', () => {
    const wrapper = shallow(<App />);
    wrapper.unmount();
  });
});
