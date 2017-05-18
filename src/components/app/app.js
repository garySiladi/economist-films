// @flow
import React from 'react';
import { browserHistory } from 'react-router';
import SidePanel from '../side-panel/side-panel';
import { getRoot, getRecommendedEpisodes } from '../../api/fetch';
import HomeContainer from '../home-container/home-container';
import './app.css';

type AppParamsProps = {
  selectedEpisodeId?: string, // eslint-disable-line
}

type AppProps = {
  params: AppParamsProps,
}

type SeriesType = {
  items: Array<Object>
}

class App extends React.Component {
  static createRecommendedSlider(dataRecommended) {
    return {
      title: 'Recommended',
      items: dataRecommended.recommended_videos,
      type: 'series',
    };
  }
  static massageSeries(series: Object) {
    series.pop();
    series.pop();
    return series;
  }
  static setEpisodeByParam(id: ?string, series: Array<SeriesType>) {
    const foundEpisodes = [];
    series.forEach((shelf, shelfIndex) => {
      if (shelf.items) {
        shelf.items.forEach((episode, episodeIndex) => {
          if (episode.id === Number(id) && episode.type === 'Episode') {
            foundEpisodes.push([shelfIndex, episodeIndex]);
          }
        });
      }
    });
    const firstResult = foundEpisodes[0];
    return {
      selectedSeries: firstResult ? firstResult[0] : 0,
      selectedEpisode: firstResult ? firstResult[1] : 0,
      goToEpisode: firstResult instanceof Array,
    };
  }
  constructor() {
    super();
    this.state = {
      isSelectedSidePanel: false,
      isSelectedHomeContainer: true,
      series: [],
      selectedSeries: 0,
      selectedEpisode: 0,
      goToEpisode: false,
    };
    (this: any).handleKeyPress = this.handleKeyPress.bind(this);
    (this: any).handleReturnFromEpisode = this.handleReturnFromEpisode.bind(this);
  }
  state: {
    isSelectedSidePanel: boolean,
    isSelectedHomeContainer: boolean,
    series: Array<Object>,
    selectedSeries: number,
    selectedEpisode: number,
    goToEpisode: boolean,
  }
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
    const {
      params,
    } = this.props;
    getRoot()
    .then((dataSeries) => {
      const modifiedSeries = this.state.series.concat(
        App.massageSeries(dataSeries.shelves || []),
      );
      this.setState({
        series: modifiedSeries,
        ...App.setEpisodeByParam(params.selectedEpisodeId, modifiedSeries),
      });
    });
    getRecommendedEpisodes(1)
    .then((dataRecommended) => {
      const modifiedSeries =
        [App.createRecommendedSlider(dataRecommended)].concat(this.state.series);
      this.setState({
        series: modifiedSeries,
        ...App.setEpisodeByParam(params.selectedEpisodeId, modifiedSeries),
      });
    });
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }
  props: AppProps
  handleReturnFromEpisode(event: Object) {
    event.preventDefault();
    this.setState({
      goToEpisode: false,
    });
  }
  handleKeyPress(event: Object) { // TODO: maybe export this functionality to another file
    const {
      isSelectedSidePanel,
      isSelectedHomeContainer,
      selectedSeries,
      series,
      selectedEpisode,
      goToEpisode,
    } = this.state;
    if (goToEpisode) return;
    switch (event.code) {
      case 'ArrowLeft':
        event.preventDefault();
        if (isSelectedHomeContainer && selectedEpisode === 0) {
          this.setState({
            isSelectedHomeContainer: false,
            isSelectedSidePanel: true,
          });
        }
        if (isSelectedHomeContainer && selectedEpisode !== 0) {
          this.setState({
            selectedEpisode: selectedEpisode - 1,
          });
        }
        break;
      case 'ArrowRight':
        event.preventDefault();
        if (isSelectedSidePanel) {
          this.setState({
            isSelectedHomeContainer: true,
            isSelectedSidePanel: false,
          });
        }
        if (
          isSelectedHomeContainer
          && selectedEpisode !== series[selectedSeries].items.length - 1
        ) {
          this.setState({
            selectedEpisode: selectedEpisode + 1,
          });
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.resetSelectedEpisode();
        if (isSelectedHomeContainer && selectedSeries !== 0) {
          this.setState({
            selectedSeries: selectedSeries - 1,
          });
        }
        break;
      case 'ArrowDown':
        event.preventDefault();
        this.resetSelectedEpisode();
        if (isSelectedHomeContainer && selectedSeries !== series.length - 1) {
          this.setState({
            selectedSeries: selectedSeries + 1,
          });
        }
        break;
      case 'Enter':
        event.preventDefault();
        if (isSelectedHomeContainer) {
          if (selectedEpisode === 0) {
            browserHistory.push(`/series/${this.state.selectedSeries}`);
          } else {
            this.setState({
              goToEpisode: true,
            });
          }
        }
        break;
      case 'Backspace':
        event.preventDefault();
        if (isSelectedHomeContainer) {
          this.resetSelectedEpisode();
        }
        break;
      default:
    }
  }
  resetSelectedEpisode() {
    this.setState({
      selectedEpisode: 0,
    });
  }
  render() {
    const {
      isSelectedSidePanel,
      isSelectedHomeContainer,
      series,
      selectedSeries,
      selectedEpisode,
      goToEpisode,
    } = this.state;
    return (
      <div className="app">
        <SidePanel
          isSelected={isSelectedSidePanel}
          user={{ id: 1, name: 'Profile Name', imgUrl: 'x' }}
        />
        <HomeContainer
          series={series}
          isSelected={isSelectedHomeContainer}
          selectedSeries={selectedSeries}
          selectedEpisode={selectedEpisode}
          goToEpisode={goToEpisode}
          closePopupFunction={this.handleReturnFromEpisode}
        />
      </div>
    );
  }
}

export default App;
