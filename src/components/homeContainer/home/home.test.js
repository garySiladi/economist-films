// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import Home from './home';


test('Home renders without data', () => {
  const tree : string = renderer.create(<Home />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Home renders with data', () => {
  const tree : string = renderer.create(<Home shelves={[ { title: 'xxx' } ]} />).toJSON();
  expect(tree).toMatchSnapshot();
});
