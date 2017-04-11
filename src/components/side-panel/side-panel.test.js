// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import SidePanel from './side-panel';

const dummyUser = {id: 1, name: 'xxx', imgUrl: 'yyy'};

test('HomeContainer renders correctly', () => {
  const user = {id: 1, name: 'xxx', imgUrl: 'yyy'};
  const component : any = renderer.create(<SidePanel user={dummyUser} />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('CheckboxWithLabel changes the text after click', () => {
  // Render a checkbox with label in the document
  const sidePanel = shallow(<SidePanel user={dummyUser} />);
  expect(sidePanel.hasClass('side-panel--expanded')).toEqual(false);
  sidePanel.find('.activator').simulate('click');
  expect(sidePanel.hasClass('side-panel--expanded')).toEqual(true);
});
