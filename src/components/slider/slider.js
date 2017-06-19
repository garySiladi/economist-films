// @flow
import React from 'react';
import classnames from 'classnames';
import SliderItem from './parts/slider-item';
import SliderStructure from '../../structures/root';
import './slider.css';

class Slider extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static getHorizontalOffset(selectedEpisode, data) {
    const sliderMarginWidth = 115;
    const sliderItemWidth = 320;
    const offsetX = 0 - sliderItemWidth;
    const homePageWidth = window.innerWidth - sliderMarginWidth;
    const viewportHorizontalSlotNumber = Math.trunc(homePageWidth / sliderItemWidth);
    const itemsToTheRightFromSelected = data.length - selectedEpisode;
    const areMoreEpisodesThanSlots = data.length > viewportHorizontalSlotNumber;
    const itemsBeforeSelectedEpisode =
      areMoreEpisodesThanSlots ? data.length - viewportHorizontalSlotNumber : 0;
    return (viewportHorizontalSlotNumber > itemsToTheRightFromSelected ?
      itemsBeforeSelectedEpisode : selectedEpisode) * offsetX;
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
    const calcOffset = isSelected ? Slider.getHorizontalOffset(selectedEpisode, data) : 0;
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


// static getSelectorStyle(isSelected, selectedEpisode, data) {
//   const horizontalOffset = -320;
//   const calcOffset = isSelected ? selectedEpisode * horizontalOffset : 0;
//   const sliderMarginWidth = 115;
//   const sliderItemWidth = 320;
//   const leftOffsetWithMargins = Math.abs(calcOffset);
//   const homePageWidth = window.innerWidth - sliderMarginWidth;
//   const itemCount = data.length;
//   const sliderItemsWidth = (itemCount * sliderItemWidth);
//   const homePageWithOffset = homePageWidth + leftOffsetWithMargins;
//   const restOfPage = homePageWithOffset - sliderItemsWidth;
//   let sliderStyle = { transform: `translate(${calcOffset}px, 0px)` };
//   if (calcOffset < 0) {
//     if (restOfPage < sliderItemWidth) {
//       sliderStyle = { transform: `translate(${calcOffset}px, 0px)` };
//       return sliderStyle;
//     }
//     if (restOfPage > sliderItemWidth) {
//       let addition = 0;
//       const homeItemWidth = homePageWidth + sliderItemWidth;
//       const sliderWidth = sliderItemWidth * itemCount;
//       if ((homeItemWidth - sliderWidth) < 0) {
//         addition = Math.ceil(((sliderWidth - homeItemWidth) / sliderItemWidth));
//       }
//       sliderStyle = { transform: `translate(${calcOffset +
// (((selectedEpisode) - 1 - addition) * sliderItemWidth)}px, 0px)` };
//       return sliderStyle;
//     }
//   }
//   return sliderStyle;
// }
