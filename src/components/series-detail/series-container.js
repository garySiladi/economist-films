// @flow
import React from 'react';
import { getSeriesByID } from '../../api/fetch';
import './series-container.css';
import Slider from '../slider/slider';

export type SeriesContainerProps = {
  params: {
    id: number,
  }
}
export type SeriesContainerState = {
  episodes: Array<Object>,
  series: Object,
  isSliderSelected: boolean,
  selectedEpisode: number,
}

class SeriesContainer extends React.Component {
  constructor(props: SeriesContainerProps) {
    super(props);
    this.state = {
      episodes: [],
      series: {},
      selectedEpisode: 0,
      isSliderSelected: true,
    };
    (this: any).handleKeyPress = (this: any).handleKeyPress.bind(this);
  }
  state: SeriesContainerState
  componentWillMount() {
    getSeriesByID(this.props.params.id)
    .then((series) => {
      this.setState({
        episodes: series.published_episodes,
        series,
      });
    });
  }
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }
  handleKeyPress(event: Object) {
    const {
      episodes,
      selectedEpisode,
      isSliderSelected,
    } = (this: any).state;
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
        }
        break;
      case 'ArrowRight':
        if (isSliderSelected && selectedEpisode < episodes.length -1) {
          (this: any).setState({
            selectedEpisode: selectedEpisode +1,
          });
        }
        break;
      default:
    }
  }

  render() {
    return (
      <div className="series-container">
        <Slider
          data={this.state.episodes}
          className="home-slider"
          sliderTitle={this.state.series.title}
          key={this.state.series.title}
          isSliderSelected={this.state.isSliderSelected}
          selectedEpisode={this.state.selectedEpisode}
        />
      </div>
    );
  }
}
export default SeriesContainer;
