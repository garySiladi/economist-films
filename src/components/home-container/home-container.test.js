// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import HomeContainer from './home-container';
import * as API from '../../api/fetch';

const mockData = {
  shelves: [
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
  ],
};

jest.mock('../slider/slider', () =>
  jest.fn(() => <div>Slider</div>),
);

describe('HomeContainer: ', () => {
  // $FlowFixMe
  API.getRoot = jest.fn()
  .mockReturnValue(
    new Promise((resolve) => {
      resolve(mockData);
    }),
  );

  test('renders correctly', () => {
    const tree : string = renderer.create(<HomeContainer />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
