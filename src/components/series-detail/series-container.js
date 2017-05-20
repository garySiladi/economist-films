// @flow
import React from 'react';
import Slider from '../slider/slider';
import SidePanel from '../side-panel/side-panel';
import { getSeriesByID } from '../../api/fetch';
import './series-container.css';

export type SeriesContainerProps = {
  params: {
    id: number,
  }
}
export type SeriesContainerState = {
  episodes: Array<Object>,
  series: Object,
  selectedEpisode: number,
  isSliderSelected: boolean,
  isSideBarSelected: boolean,
}

class SeriesContainer extends React.Component {
  constructor(props: SeriesContainerProps) {
    super(props);
    this.state = {
      episodes: [],
      series: {},
      selectedEpisode: 0,
      isSliderSelected: true,
      isSideBarSelected: false,
    };
    (this: any).handleKeyPress = (this: any).handleKeyPress.bind(this);
  }
  state: SeriesContainerState
  componentWillMount() {
    getSeriesByID(this.props.params.id)
    .then((series) => {
      (this: any).setState({
        episodes: series.published_episodes,
        series,
      });
    });
  }
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }
  handleKeyPress(event: Object) {
    const {
      episodes,
      selectedEpisode,
      isSliderSelected,
      isSideBarSelected,
    } = this.state;
    switch (event.code) {
      case 'ArrowUp':
        break;
      case 'ArrowDown':
        break;
      case 'ArrowLeft':
        if (isSliderSelected && selectedEpisode !== 0) {
          (this: any).setState({
            selectedEpisode: selectedEpisode -1,
          });
        } if (selectedEpisode === 0) {
          this.setState({
            isSliderSelected: false,
            isSideBarSelected: true,
          });
          console.log('sidebar');
        }
        break;
      case 'ArrowRight':
        if (isSliderSelected && selectedEpisode < episodes.length -1) {
          (this: any).setState({
            selectedEpisode: selectedEpisode +1,
          });
        } if (isSideBarSelected) {
          this.setState({
            isSliderSelected: true,
            isSideBarSelected: false,
          });
        }
        console.log('slider');
        break;
      default:
    }
  }

  render() {
    return (
      <div className="series-container">
        <SidePanel
          isSelected={this.state.isSideBarSelected}
          user={{ id: 1, name: 'Profile Name', imgUrl: 'x' }}
        />
        <Slider
          data={this.state.episodes}
          className="home-slider"
          sliderTitle={this.state.series.title}
          key={this.state.series.title}
          isSelected={this.state.isSliderSelected}
          selectedEpisode={this.state.selectedEpisode}
        />
      </div>
    );
  }
}
export default SeriesContainer;
