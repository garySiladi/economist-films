// @flow
import React from 'react';
import classnames from 'classnames';
import SliderItem from './parts/slider-item';
import SliderStructure from '../../structures/root';
import './slider.css';

class Slider extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static defaultProps = {
    data: [],
    className: 'slider',
    sliderTitle: 'Slider Title',
    isFullWidth: false,
  };
  props: SliderStructure
  render() {
    const {
      isSelected,
      isAfterSelected,
      isEpisodeExpanded,
      className,
      sliderTitle,
      selectedEpisode,
    } = this.props;
    const sliderClassName = classnames(
      { [`${className}`]: true },
      { [`${className}--selected`]: isSelected },
      { [`${className}--after-expanded`]: isAfterSelected && isEpisodeExpanded },
    );
    const horizontalOffset = -320;
    const calcOffset = isSelected ? selectedEpisode * horizontalOffset : 0;
    return (
      <div className={sliderClassName} >
        <div className="slider-title">{sliderTitle}</div>
        <div
          className="slider-items"
          style={{ transform: `translate(${calcOffset}px, 0px)` }}
        >
          {this.props.data.map((item, index) =>
            <SliderItem
              {...item}
              key={item.title}
              className="slider-item"
              isSelectedSeries={isSelected}
              isSelected={isSelected && index === selectedEpisode}
              isFullWidth={this.props.isFullWidth}
            />,
          )}
        </div>
      </div>
    );
  }
}

export default Slider;
