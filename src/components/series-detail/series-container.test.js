// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import SeriesContainer from './series-container';

const mockData = {
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
};

describe('SeriesContainer', () => {
  test('renders correctly with data', () => {
    const tree : string = renderer.create(
      <SeriesContainer
        series={mockData}
        params={{ id: 5 }}
      />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('renders correctly without data', () => {
    const tree : string = renderer.create(
      <SeriesContainer
        params={{ id: 5 }}
      />,
      ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
