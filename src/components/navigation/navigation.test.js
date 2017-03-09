// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import Nav from './navigation';

test('Nav renders correctly', () => {
  const tree : string = renderer.create(<Nav />).toJSON();
  expect(tree).toMatchSnapshot();
});
