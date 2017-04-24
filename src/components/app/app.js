// @flow
import React from 'react';
import { browserHistory } from 'react-router';
import SidePanel from '../side-panel/side-panel';
import { getRoot, getRecommendedEpisodes } from '../../api/fetch';
import HomeContainer from '../home-container/home-container';
import './app.css';

// App needs to be a class in order to allow hot-reloading
// that's why we disable react/prefer-stateless-function
class App extends React.Component { // eslint-disable-line react/prefer-stateless-function
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
    getRoot()
    .then((dataSeries) => {
      this.setState({
        series: this.state.series.concat(
          App.massageSeries(dataSeries.shelves || []),
        ),
      });
    });
    getRecommendedEpisodes(1)
    .then((dataRecommended) => {
      this.setState({
        series: [App.createRecommendedSlider(dataRecommended)].concat(this.state.series),
      });
    });
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }
  handleKeyPress(event: Object) { // TODO: maybe export this functionality to another file
    event.preventDefault();
    const {
      isSelectedSidePanel,
      isSelectedHomeContainer,
      selectedSeries,
      series,
      selectedEpisode,
    } = this.state;
    switch (event.key) {
      case 'ArrowLeft':
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
        this.resetSelectedEpisode();
        if (isSelectedHomeContainer && selectedSeries !== 0) {
          this.setState({
            selectedSeries: selectedSeries - 1,
          });
        }
        break;
      case 'ArrowDown':
        this.resetSelectedEpisode();
        if (isSelectedHomeContainer && selectedSeries !== series.length - 1) {
          this.setState({
            selectedSeries: selectedSeries + 1,
          });
        }
        break;
      case 'Enter':
        if (isSelectedHomeContainer) {
          const id = series[selectedSeries].items[selectedEpisode].id;
          browserHistory.push(`/episode/${id}`);
        }
        break;
      case 'Backspace':
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
        />
      </div>
    );
  }
}

export default App;
