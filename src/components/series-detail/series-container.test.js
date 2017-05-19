// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import SeriesContainer from './series-container';

// const mockData = [
//   {
//     title: 'Ocean',
//     items: [
//       {
//         id: 1,
//         title: 'xxx',
//         type: 'yyy',
//       },
//       {
//         id: 2,
//         title: 'aaa',
//         type: 'bbb',
//       },
//     ],
//   },
// ];

test('renders correctly', () => {
  const tree : string = renderer.create(
    <SeriesContainer
      params={{ id: 50 }}
    />).toJSON();
  expect(tree).toMatchSnapshot();
});
