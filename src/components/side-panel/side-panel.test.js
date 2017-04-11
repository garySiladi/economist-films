// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import SidePanel from './side-panel';

const dummyUser = {id: 1, name: 'xxx', imgUrl: 'yyy'};

test('SidePanel renders correctly', () => {
  const component = renderer.create(<SidePanel user={dummyUser} />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('SidePanel expands after click', () => {
  const sidePanel = mount(<SidePanel user={dummyUser} />);
  expect(sidePanel.hasClass('side-panel--expanded')).toEqual(false);
  sidePanel.find('.side-panel-card').first().simulate('click');
  expect(sidePanel.hasClass('side-panel--expanded')).toEqual(true);
});
