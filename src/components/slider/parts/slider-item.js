// @flow
import React from 'react';
import classnames from 'classnames';
import './slider-item.css';

type SliderItemType = {
  title: string,
  subtitle?: string,
  thumbnail?: ?Object,
  type: string,
  episode_count?: number,
  className: string,
  isSelected: boolean,
  isFullWidth?: boolean,
};

class SliderItem extends React.Component {
  static isItemSeries(type) {
    return type === 'Series';
  }
  static setTeaserImage(thumbnail, isFullWidth) {
    if (isFullWidth) {
      return thumbnail && thumbnail.full_width ? thumbnail.full_width.url : '';
    }
    return thumbnail && thumbnail.thumb ? thumbnail.thumb.url : '';
  }
  static defaultProps = {
    subtitle: '',
    thumbnail: null,
    episode_count: 0,
    isFullWidth: false,
  };
  props: SliderItemType;
  render() {
    const {
      title,
      subtitle,
      thumbnail,
      type,
      episode_count: episodeCount,
      className,
      isSelected,
      isFullWidth,
    } = this.props;
    return (
      <div
        className={classnames({
          [`${className}`]: true,
          [`${className}--selected`]: isSelected,
          [`${className}--full-width`]: isFullWidth,
        })}
      >
        <img
          src={SliderItem.setTeaserImage(thumbnail, isFullWidth)}
          alt={title}
          className="slider-item__image"
        />
        {isFullWidth ? null : (
          <div className="slider-item__container">
            <div className="slider-item__title">{title}</div>
            <div className="slider-item__subtitle">
              {SliderItem.isItemSeries(type) ? `${String(episodeCount)} episodes` : subtitle}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default SliderItem;
