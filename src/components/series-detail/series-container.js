// @flow
import React from 'react';
import { browserHistory } from 'react-router';
import Slider from '../slider/slider';
import SidePanel from '../side-panel/side-panel';
import EpisodeSelected from '../episode-selected/episode-selected';
import { getSeriesByID } from '../../api/fetch';
import './series-container.css';

export type SeriesContainerProps = {
  params: {
    id: number,
  },
  location: {
    query: {
      expandedEpisode: string,
    }
  },
}
export type SeriesContainerState = {
  episodes: Array<Object>,
  series: Object,
  selectedEpisode: number,
  isSliderSelected: boolean,
  isSideBarSelected: boolean,
  isEpisodeDetailSelected: boolean,
  goToEpisodeDetail: boolean,
}

class SeriesContainer extends React.Component {
  static findEpisode(episodes: Array<Object>, expandedEpisodeID: string) {
    let foundEpisode = 0;
    episodes.forEach((episode, index) => {
      if (episode.id === Number(expandedEpisodeID)) {
        foundEpisode = index;
      }
    });
    return foundEpisode;
  }
  constructor(props: SeriesContainerProps) {
    super(props);
    this.state = {
      episodes: [],
      series: {},
      selectedEpisode: 0,
      isSliderSelected: true,
      isSideBarSelected: false,
      goToEpisodeDetail: false,
      isEpisodeDetailSelected: false,
    };
    (this: any).handleKeyPress = (this: any).handleKeyPress.bind(this);
    (this: any).handleExpand = (this: any).handleExpand.bind(this);
    (this: any).handleReturnFromEpisode = (this: any).handleReturnFromEpisode.bind(this);
  }
  state: SeriesContainerState
  componentWillMount() {
    getSeriesByID(this.props.params.id)
    .then((series) => {
      (this: any).setState({
        episodes: series.published_episodes,
        selectedEpisode:
          SeriesContainer.findEpisode(
            series.published_episodes,
            this.props.location.query.expandedEpisode),
        series,
      });
    });
  }
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
    this.handleExpand();
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }
  handleExpand() {
    if (this.props.location.query.expandedEpisode) {
      (this: any).setState({
        goToEpisodeDetail: true,
      });
    }
  }
  handleReturnFromEpisode() {
    this.setState({ goToEpisodeDetail: false });
  }
  handleKeyPress(event: Object) {
    const {
      episodes,
      selectedEpisode,
      isSliderSelected,
      isSideBarSelected,
    } = this.state;
    switch (event.code) {
      case 'ArrowLeft':
        event.preventDefault();
        if (isSliderSelected && selectedEpisode !== 0) {
          (this: any).setState({
            selectedEpisode: selectedEpisode -1,
          });
        } if (selectedEpisode === 0) {
          (this: any).setState({
            isSliderSelected: false,
            isSideBarSelected: true,
            goToEpisodeDetail: false,
          });
        }
        break;
      case 'ArrowRight':
        event.preventDefault();
        if (isSliderSelected && selectedEpisode < episodes.length -1) {
          (this: any).setState({
            selectedEpisode: selectedEpisode +1,
          });
        } if (isSideBarSelected) {
          (this: any).setState({
            isSliderSelected: true,
            isSideBarSelected: false,
          });
        }
        break;
      case 'Enter':
        if (isSliderSelected) {
          (this: any).setState({ goToEpisodeDetail: true });
        }
        break;
      case 'Backspace':
        browserHistory.goBack();
        break;
      default:
    }
  }

  render() {
    const {
      series,
      episodes,
      selectedEpisode,
      isSliderSelected,
      isSideBarSelected,
      goToEpisodeDetail,
    } = this.state;
    const selectedEpisodeData = episodes[selectedEpisode];
    const episodeDetailsContainer = goToEpisodeDetail && selectedEpisodeData ? (
      <EpisodeSelected
        id={selectedEpisodeData.id}
        key={selectedEpisodeData.id}
        url={selectedEpisodeData.thumbnail.url}
        title={selectedEpisodeData.title}
        subtitle={selectedEpisodeData.subtitle}
        description={selectedEpisodeData.description}
        closePopupFunction={this.handleReturnFromEpisode}
        videoUrl={selectedEpisodeData.video_url}
        seriesId={selectedEpisodeData.series_id}
        isSelectedHomeContainer={false}
      />
    ) : null;
    return (
      <div className="series-container">
        <SidePanel
          isSelected={isSideBarSelected}
          user={{ id: 1, name: 'Profile Name', imgUrl: 'x' }}
        />
        <Slider
          data={episodes}
          className="home-slider"
          sliderTitle={series.title}
          key={series.title}
          isSelected={isSliderSelected}
          selectedEpisode={selectedEpisode}
        />
        {episodeDetailsContainer}
      </div>
    );
  }
}
export default SeriesContainer;
