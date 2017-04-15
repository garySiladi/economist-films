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
  },
  {
    title: 'Episode 19 Title',
    type: 'Episode',
    id: 19,
    subtitle: 'subtitle',
    thumbnail: {},
  },
];

test('SliderItem renders correctly', () => {
  let tree : string = '';
  dummyData.forEach((data) => {
    tree = renderer.create(<SliderItem {...data} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
