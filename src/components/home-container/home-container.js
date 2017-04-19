// @flow
import React from 'react';
import Slider from '../slider/slider';
import './home-container.css';

class HomeContainer extends React.Component { // eslint-disable-line react/prefer-stateless-function
  props: {
    series: Array<Object>,
    isSelected: boolean,
    selectedSeries: number,
    selectedEpisode: number,
  };
  render() {
    const {
      series,
      isSelected,
      selectedSeries,
      selectedEpisode,
    } = this.props;
    if (!series[0]) return null;
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
    return (
      <div className="home-container">
        {homePageContent.splice(0, homePageContent.length - 2)}
      </div>
    );
  }
}

export default HomeContainer;
