// @flow
import React from 'react';
import classnames from 'classnames';
import SliderItem from './parts/slider-item';
import SliderStructure from '../../structures/root';
import './slider.css';

class Slider extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static getSelectorStyle(isSelected, selectedEpisode, data) {
    const horizontalOffset = -320;
    const calcOffset = isSelected ? selectedEpisode * horizontalOffset : 0;
    const sliderMarginWidth = 115;
    const sliderItemWidth = 320;
    const leftOffsetWithMargins = Math.abs(calcOffset);
    const homePageWidth = window.innerWidth - sliderMarginWidth;
    const itemCount = data.length;
    const sliderItemsWidth = (itemCount * sliderItemWidth);
    const homePageWithOffset = homePageWidth + leftOffsetWithMargins;
    const restOfPage = homePageWithOffset - sliderItemsWidth;
    let sliderStyle = { transform: `translate(${calcOffset}px, 0px)` };
    if (calcOffset < 0) {
      if (restOfPage < sliderItemWidth) {
        sliderStyle = { transform: `translate(${calcOffset}px, 0px)` };
        return sliderStyle;
      }
      if (restOfPage > sliderItemWidth) {
        let addition = 0;
        const homeItemWidth = homePageWidth + sliderItemWidth;
        const sliderWidth = sliderItemWidth * itemCount;
        if ((homeItemWidth - sliderWidth) < 0) {
          addition = Math.ceil(((sliderWidth - homeItemWidth) / sliderItemWidth));
        }
        sliderStyle = { transform: `translate(${calcOffset + (((selectedEpisode) - 1 - addition) * sliderItemWidth)}px, 0px)` };
        return sliderStyle;
      }
    }
    return sliderStyle;
  }
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
      data,
    } = this.props;
    const sliderClassName = classnames(
      { [`${className}`]: true },
      { [`${className}--selected`]: isSelected },
      { [`${className}--after-expanded`]: isAfterSelected && isEpisodeExpanded },
    );
    const sliderStyle = Slider.getSelectorStyle(isSelected, selectedEpisode, data);
    return (
      <div className={sliderClassName} >
        <div className="slider-title">{sliderTitle}</div>
        <div
          className="slider-items"
          style={sliderStyle}
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
