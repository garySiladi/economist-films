// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import SliderItem from './slider-item';

const dummyData = [
  {
    title: 'Episode 6 Title',
    type: 'Episode',
    id: 6,
    subtitle: 'subtitle',
    thumbnail: {
      thumb: {
        url: 'url',
      },
    },
    className: 'slider-item',
    isSelected: false,
    isBeforeSelected: false,
    isSelectedSeries: false,
  },
  {
    title: 'Series 1 Title',
    type: 'Series',
    id: 9,
    episode_count: 10,
    thumbnail: {
      thumb: {
        url: 'url',
      },
    },
    className: 'slider-item',
    isSelected: false,
    isBeforeSelected: true,
    isSelectedSeries: true,
  },
  {
    title: 'Episode 19 Title',
    type: 'Episode',
    id: 19,
    subtitle: 'subtitle',
    thumbnail: {},
    className: 'slider-item',
    isSelected: true,
    isBeforeSelected: false,
    isSelectedSeries: true,
  },
];

test('SliderItem renders correctly', () => {
  dummyData.forEach((data) => {
    const tree: string = renderer.create(<SliderItem {...data} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
