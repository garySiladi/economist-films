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
  },
];

test('Slider renders correctly', () => {
  const tree : string = renderer.create(<Slider data={dummyData} />).toJSON();
  expect(tree).toMatchSnapshot();
});
