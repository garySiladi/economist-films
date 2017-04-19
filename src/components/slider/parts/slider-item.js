// @flow
import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router';
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
      id,
      thumbnail,
      type,
      episode_count: episodeCount,
      className,
      isSelected,
      isBeforeSelected,
      isSelectedSeries,
    } = this.props;
    const sliderItemClassName = classnames(
      { [`${className}`]: true },
      { [`${className}--selected`]: isSelected },
      { [`${className}--left-offset`]: isSelectedSeries && isBeforeSelected },
    );
    return (
      <Link
        className={sliderItemClassName}
        to={`/episode/${id}`}
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
      </Link>
    );
  }
}

SliderItem.propTypes = SliderItemType;

export default SliderItem;
