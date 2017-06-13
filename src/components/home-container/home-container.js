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
    closePopupFunction: Function,
    isSelectedHomeContainer: boolean,
    hideSidebarFunction: Function,
  };
  render() {
    const {
      series,
      isSelected,
      selectedSeries,
      selectedEpisode,
      goToEpisode,
      closePopupFunction,
      isSelectedHomeContainer,
      hideSidebarFunction,
    } = this.props;
    if (!series[0]) return null;
    const selectedEpisodeData = series[selectedSeries].items[selectedEpisode];
    const episodeDetailsContainer = (
      <EpisodeSelected
        id={selectedEpisodeData.id}
        key={selectedEpisodeData.id}
        url={selectedEpisodeData.thumbnail.url}
        title={selectedEpisodeData.title}
        subtitle={selectedEpisodeData.subtitle}
        description={selectedEpisodeData.description}
        closePopupFunction={closePopupFunction}
        videoUrl={selectedEpisodeData.video_url}
        seriesId={selectedEpisodeData.series_id}
        isSelectedHomeContainer={isSelectedHomeContainer}
        hideSidebarFunction={hideSidebarFunction}
        isShown={goToEpisode}
      />
    );
    const homePageContent = series.map((data, index) =>
      (
        <Slider
          data={data.items}
          className="home-slider"
          sliderTitle={data.title}
          key={data.title}
          isSelected={isSelected && index === selectedSeries}
          isAfterSelected={index > selectedSeries}
          selectedEpisode={selectedEpisode}
          isEpisodeExpanded={goToEpisode}
        />
      ),
    );
    homePageContent.splice(selectedSeries + 1, 0, episodeDetailsContainer);
    const verticalOffset = -320;
    return (
      <div
        className="home-container"
        style={{ transform: `translate(0px, ${selectedSeries * verticalOffset}px)` }}
      >
        {homePageContent}
      </div>
    );
  }
}

export default HomeContainer;
