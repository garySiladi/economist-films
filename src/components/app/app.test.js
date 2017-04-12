// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import App from './app';

jest.mock('../side-panel/side-panel', () =>
  jest.fn(() => <div>Side Panel</div>),
);

jest.mock('../home-container/home-container', () =>
  jest.fn(() => <div>Home Container</div>),
);

test('App renders correctly', () => {
  const tree : string = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});
