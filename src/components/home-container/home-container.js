// @flow
import React from 'react';
import Slider from '../slider/slider';
import EpisodeSelected from '../episode-selected/episode-selected';
import './home-container.css';

class HomeContainer extends React.Component {
  static isFullWidthSeries(seriesData) {
    return seriesData.thumbnail_size === 'full_width';
  }
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
        seriesId={selectedEpisodeData.series_id}
        isSelectedHomeContainer={isSelectedHomeContainer}
        hideButtons={
          !isSelectedHomeContainer || HomeContainer.isFullWidthSeries(series[selectedSeries])
        }
        hideSidebarFunction={hideSidebarFunction}
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
          selectedEpisode={selectedEpisode}
          isFullWidth={HomeContainer.isFullWidthSeries(data)}
        />
      ),
    );
    if (goToEpisode) homePageContent.splice(selectedSeries + 1, 0, episodeDetailsContainer);
    const verticalOffset = -350;
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
