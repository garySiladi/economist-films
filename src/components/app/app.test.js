// @flow
import React from 'react';
import renderer from 'react-test-renderer';
// import { mount } from 'enzyme';
// import * as API from '../../api/fetch';
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
];

jest.mock('../side-panel/side-panel', () =>
  jest.fn(() => <div>Side Panel</div>),
);

jest.mock('../home-container/home-container', () =>
  jest.fn(() => <div>Home Container</div>),
);

// const mockFetch = {
//   shelves: mockData,
// };

// API.getRoot = jest.fn()
// .mockReturnValue(
//   new Promise((resolve) => {
//     resolve(mockFetch);
//   }),
// );

test('App renders correctly', () => {
  const tree : string = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});

// test('App renders asd', () => {
//   const app = mount(<App />);
//   app.instance().handleKeyPress({ key: 'ArrowLeft', preventDefault: () => {} });
//   expect(app.state.isSelectedSidePanel).toEqual(true);
  // const element = shallow(<App />);
  // element.instance().state.isSelectedSidePanel = true;
  // console.log(element.text());
  // element.setState({ name: 'bar' });
  // element.instance().resetSelectedEpisode();
  // element.simulate('keyDown', { key: 'ArrowLeft' });
  // expect(element.text()).toEqual('');
  // const event = new KeyboardEvent('keydown', { keyCode: 37 });
  // document.dispatchEvent(event);
// });
