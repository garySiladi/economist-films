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
  };
  props: SliderStructure
  render() {
    const {
      isSelected,
      className,
      sliderTitle,
      isBeforeSelected,
      isHidden,
      selectedEpisode,
    } = this.props;
    const sliderClassName = classnames(
      { [`${className}`]: true },
      { [`${className}--selected`]: isSelected },
      { [`${className}--top-offset`]: isBeforeSelected || isHidden },
      { [`${className}--top-hidden`]: isHidden },
    );
    return (
      <div className={sliderClassName}>
        <div className="slider-title">{sliderTitle}</div>
        <div className="slider-items">
          {this.props.data.map((item, index) =>
            <SliderItem
              {...item}
              key={item.title}
              className="slider-item"
              isSelectedSeries={isSelected}
              isBeforeSelected={index < selectedEpisode}
              isSelected={isSelected && index === selectedEpisode}
            />,
          )}
        </div>
      </div>
    );
  }
}

export default Slider;
