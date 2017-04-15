// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import Slider from './slider';

const dummyData = [
  {
    title: 'Episode 1 Title',
    type: 'Episode 1',
  },
  {
    title: 'Episode 2 Title',
    type: 'Episode 2',
    thumbnail: {
      thumb: {
        url: 'xxx',
      },
    },
  },
  {
    title: 'Some title',
    type: 'Series',
  },
];

jest.mock('./parts/slider-item', () =>
  jest.fn(() => <div>SliderItem</div>),
);

test('Slider renders correctly', () => {
  const tree : string = renderer.create(<Slider data={dummyData} />).toJSON();
  expect(tree).toMatchSnapshot();
});
