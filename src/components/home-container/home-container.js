// @flow
import React from 'react';
import Slider from '../slider/slider';
import EpisodeSelected from '../episode-selected/episode-selected';
import './home-container.css';

class HomeContainer extends React.Component { // eslint-disable-line react/prefer-stateless-function
  props: {
    series: Array<Object>,
    isSelected: boolean,
    selectedSeries: number,
    selectedEpisode: number,
    goToEpisode: boolean,
    closePopupFunction: ?Function,
  };
  render() {
    const {
      series,
      isSelected,
      selectedSeries,
      selectedEpisode,
      goToEpisode,
      closePopupFunction,
    } = this.props;
    if (!series[0]) return null;
    const selectedEpisodeData = series[selectedSeries].items[selectedEpisode];
    const episodeDetailsContainer = goToEpisode ? (
      <EpisodeSelected
        id={selectedEpisodeData.id}
        key={selectedEpisodeData.id}
        url={selectedEpisodeData.thumbnail.url}
        title={selectedEpisodeData.title}
        subtitle={selectedEpisodeData.subtitle}
        description={selectedEpisodeData.description}
        closePopupFunction={closePopupFunction}
        videoUrl={selectedEpisodeData.video_url}
      />
    ) : null;
    const homePageContent = series.map((data, index) =>
      (
        <Slider
          data={data.items}
          className="home-slider"
          sliderTitle={data.title}
          key={data.title}
          isSelected={isSelected && index === selectedSeries}
          isBeforeSelected={index === selectedSeries - 1}
          isHidden={index < selectedSeries - 1}
          selectedEpisode={selectedEpisode}
        />
      ),
    );
    if (goToEpisode) homePageContent.splice(selectedSeries + 1, 0, episodeDetailsContainer);
    return (
      <div className="home-container">
        {homePageContent}
      </div>
    );
  }
}

export default HomeContainer;
