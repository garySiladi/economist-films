// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import { mount, shallow } from 'enzyme';
import EpisodeSelected from './episode-selected';

jest.mock('./parts/episode-description', () =>
  jest.fn(() => <div>EpisodeDescription</div>),
);

jest.mock('../video-player-container/parts/video-player', () =>
  jest.fn(() => <div>VideoPlayer</div>),
);

function connectEvent(event, type, wrapper) {
  const changedEvent: Object = event;
  changedEvent.key = type;
  const episodeSelected: Object = wrapper.instance();
  episodeSelected.handleKeyPress(event);
}

describe('HomeContainer: ', () => {
  test('renders with data', () => {
    const tree : string = renderer.create(<EpisodeSelected
      id={3}
      url="url xyz"
      title="title xyz"
      subtitle="subtitle xyz"
      description="description xyz"
      closePopupFunction={() => {}}
      videoUrl=""
    />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('handles keyboard events', () => {
    let episodeSelected = mount(<EpisodeSelected
      id={3}
      url="url xyz"
      title="title xyz"
      subtitle="subtitle xyz"
      description="description xyz"
      closePopupFunction={() => {}}
      videoUrl=""
    />);
    const event = new Event('keyDown');
    expect(episodeSelected.state().selectedItem).toEqual(0);
    connectEvent(event, 'ArrowRight', episodeSelected);
    expect(episodeSelected.state().selectedItem).toEqual(1);
    connectEvent(event, 'ArrowRight', episodeSelected);
    expect(episodeSelected.state().selectedItem).toEqual(2);
    connectEvent(event, 'ArrowRight', episodeSelected);
    expect(episodeSelected.state().selectedItem).toEqual(2);
    connectEvent(event, 'ArrowLeft', episodeSelected);
    expect(episodeSelected.state().selectedItem).toEqual(1);
    connectEvent(event, 'Enter', episodeSelected);
    connectEvent(event, 'ArrowLeft', episodeSelected);
    expect(episodeSelected.state().selectedItem).toEqual(0);
    connectEvent(event, 'ArrowLeft', episodeSelected);
    expect(episodeSelected.state().selectedItem).toEqual(0);
    connectEvent(event, 'ArrowUp', episodeSelected);
    connectEvent(event, 'Backspace', episodeSelected);
    connectEvent(event, 'Shift', episodeSelected);
    episodeSelected = mount(<EpisodeSelected
      id={3}
      url="url xyz"
      title="title xyz"
      subtitle="subtitle xyz"
      description="description xyz"
      closePopupFunction={null}
      videoUrl=""
    />);
    connectEvent(event, 'ArrowUp', episodeSelected);
    connectEvent(event, 'Backspace', episodeSelected);
  });
  test('mounts/unmounts', () => {
    const wrapper = shallow(<EpisodeSelected
      id={3}
      url="url xyz"
      title="title xyz"
      subtitle="subtitle xyz"
      description="description xyz"
      closePopupFunction={() => {}}
      videoUrl=""
    />);
    wrapper.unmount();
  });
});
