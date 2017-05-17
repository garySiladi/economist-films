// @flow
import React from 'react';
import classnames from 'classnames';
import SliderItemType from '../../../structures/sliderItem';
import './slider-item.css';

class SliderItem extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static isItemSeries(type) {
    return type === 'Series';
  }
  static setTeaserImage(thumbnail) {
    return thumbnail && thumbnail.thumb ? thumbnail.thumb.url : '';
  }
  defaultProps = {
    subtitle: '',
    thumbnail: null,
    episode_count: 0,
  };
  render() {
    const {
      title,
      subtitle,
      thumbnail,
      type,
      episode_count: episodeCount,
      className,
      isSelected,
    } = this.props;
    const sliderItemClassName = classnames(
      { [`${className}`]: true },
      { [`${className}--selected`]: isSelected },
    );
    return (
      <div
        className={sliderItemClassName}
      >
        <img
          src={SliderItem.setTeaserImage(thumbnail)}
          alt={title}
          className="slider-item__image"
        />
        <div className="slider-item__container">
          <div className="slider-item__title">{title}</div>
          <div className="slider-item__subtitle">
            {SliderItem.isItemSeries(type) ? `${String(episodeCount)} episodes` : subtitle}
          </div>
        </div>
      </div>
    );
  }
}

SliderItem.propTypes = SliderItemType;

export default SliderItem;
