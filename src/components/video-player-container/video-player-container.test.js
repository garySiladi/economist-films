// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import { mount, shallow } from 'enzyme';
import VideoPlayerContainer from './video-player-container';

  test('renders correctly when videoUrl state is null', () => {
    const tree : string = renderer.create(<VideoPlayerContainer params={{id: 50}} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('enders correctly when videoUrl state is not  null', () => {
    const app = mount(<VideoPlayerContainer params={{id: 50}} />);
    app.setState({ videoUrl: "https://cdn-films.economist.com/DW/MAY01_REV/MTMYSCivil.m3u8" });
    expect(app.state().videoUrl).toEqual("https://cdn-films.economist.com/DW/MAY01_REV/MTMYSCivil.m3u8");

  });
