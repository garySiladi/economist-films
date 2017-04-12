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
  const component = renderer.create(<SidePanel user={dummyUser} />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('SidePanel expands after click', () => {
  const sidePanel = shallow(<SidePanel user={dummyUser} />);
  expect(sidePanel.hasClass('side-panel--expanded')).toEqual(false);
  // $FlowFixMe
  sidePanel.instance().handleClick({
    preventDefault: jest.fn(),
  });
  expect(sidePanel.hasClass('side-panel--expanded')).toEqual(true);
});
