// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import SliderItem from './slider-item';

const dummyItem1 = {
  title: 'Episode 6 Title',
  type: 'Episode',
  id: 6,
  subtitle: 'subtitle',
  thumbnail: {
    thumb: {
      url: 'url',
    },
  },
};

const dummyItem2 = {
  title: 'Series 1 Title',
  type: 'Series',
  id: 9,
  episode_count: 10,
  thumbnail: {
    thumb: {
      url: 'url',
    },
  },
};

const dummyItem3 = {
  title: 'Episode 19 Title',
  type: 'Episode',
  id: 19,
  subtitle: 'subtitle',
};

test('SliderItem renders correctly', () => {
  let tree : string = renderer.create(<SliderItem item={dummyItem1} />).toJSON();
  expect(tree).toMatchSnapshot();
  tree = renderer.create(<SliderItem item={dummyItem2} />).toJSON();
  expect(tree).toMatchSnapshot();
  tree = renderer.create(<SliderItem item={dummyItem3} />).toJSON();
  expect(tree).toMatchSnapshot();
});
