// @flow
import React from 'react';
import Slider from '../slider/slider';
import EpisodeSelected from '../episode-selected/episode-selected';
import './home-container.css';
import type { SeriesType } from '../app/app';

class HomeContainer extends React.Component {
  static isFullWidthSeries(seriesData) {
    return seriesData.thumbnail_size === 'full_width';
  }
  props: {
    series: Array<SeriesType>,
    isSelected: boolean,
    selectedSeries: number,
    selectedEpisode: number,
    goToEpisode: boolean,
    closePopupFunction: Function,
    selectLowerSeries: Function,
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
      selectLowerSeries,
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
        selectLowerSeries={selectLowerSeries}
        videoUrl={selectedEpisodeData.video_url}
        series={series}
        seriesId={selectedEpisodeData.series_id}
        selectedSeries={selectedSeries}
        selectedEpisode={selectedEpisode}
        isSelectedHomeContainer={isSelectedHomeContainer}
        hideButtons={
          !isSelectedHomeContainer || HomeContainer.isFullWidthSeries(series[selectedSeries])
        }
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
          isFullWidth={HomeContainer.isFullWidthSeries(data)}
        />
      ),
    );
    homePageContent.splice(selectedSeries + 1, 0, episodeDetailsContainer);
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
