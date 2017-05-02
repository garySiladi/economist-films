// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import VideoPlayerContainer from './video-player-container';

describe('VideoPlayerContainer', () => {
  test('renders correctly', () => {
    const tree : string = renderer.create(<VideoPlayerContainer params={{id: 50}} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
