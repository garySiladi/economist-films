// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import HomeContainer from './home-container';

describe('HomeContainer: ', () => {
  test('renders correctly', () => {
    const tree : string = renderer.create(<HomeContainer />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('fetches correctly', () => {
    const elem = shallow(<HomeContainer />);
    expect(elem.state()).toMatchObject({ series: {} });
  });

  test('findSeriesByTitle returns correct object', () => {
    const result = HomeContainer.findSeriesByTitle('xxx', [{ title: 'xxx' }, { title: 'xzx' }]);
    expect(result).toMatchObject({ title: 'xxx' });
  });

  test('findSeriesByTitle returns null', () => {
    const result = HomeContainer.findSeriesByTitle('xxx', [{ title: 'xyx' }, { title: 'xzx' }]);
    expect(result).toBe(undefined);
  });
});
