// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import SidePanel from './side-panel';

const dummyUser = { id: 1, name: 'xxx', imgUrl: 'yyy' };

jest.mock('./parts/side-panel-card', () =>
  jest.fn(() => <div>Side Panel Card</div>),
);

test('SidePanel renders correctly', () => {
  const component = renderer.create(<SidePanel user={dummyUser} isSelected={false} />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('SidePanel expands if the prop isSelected is false', () => {
  const sidePanel = shallow(<SidePanel user={dummyUser} isSelected={false} />);
  expect(sidePanel.hasClass('side-panel--expanded')).toEqual(false);
});

test('SidePanel does not expand if the prop isSelected is true', () => {
  const sidePanel = shallow(<SidePanel user={dummyUser} isSelected />);
  expect(sidePanel.hasClass('side-panel--expanded')).toEqual(true);
});
