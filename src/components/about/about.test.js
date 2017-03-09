// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import About from './about';

test('About renders correctly', () => {
  const tree : string = renderer.create(<About />).toJSON();
  expect(tree).toMatchSnapshot();
});
