// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import HomeContainer from './home-container';

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

jest.mock('../slider/slider', () =>
  jest.fn(() => <div>Slider</div>),
);

describe('HomeContainer: ', () => {
  test('renders correctly with data', () => {
    const tree : string = renderer.create(
      <HomeContainer
        series={[]}
        isSelected={false}
        selectedSeries={0}
        selectedEpisode={0}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('renders correctly without data', () => {
    const tree : string = renderer.create(
      <HomeContainer
        series={mockData}
        isSelected
        selectedSeries={5}
        selectedEpisode={1}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
