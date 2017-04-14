// @flow
import React from 'react';
import { Link } from 'react-router';
import './slider-item.css';

export type SliderItemType = {
  title: string,
  subtitle?: string,
  id: number,
  thumbnail?: Object,
  type: string,
  episode_count?: number,
};

function isItemSeries(type) {
  return type === 'Series';
}

function setTeaserImage(thumbnail) {
  return thumbnail && thumbnail.thumb ? thumbnail.thumb.url : '';
}

const SliderItem = ({
  title, subtitle, id, thumbnail, type, episode_count: episodeCount }: SliderItemType) =>
(
  <Link className="slider-item" to={`/episode/${id}`}>
    <img
      src={setTeaserImage(thumbnail)}
      alt={title}
      className="slider-item--image"
    />
    <div className="slider-item--container">
      <div className="slider-item--title">{title}</div>
      <div className="slider-item--subtitle">
        {isItemSeries(type) ? `${String(episodeCount)} episodes` : subtitle}
      </div>
    </div>
  </Link>
);

SliderItem.defaultProps = {
  subtitle: '',
  thumbnail: null,
  episode_count: 0,
};

export default SliderItem;
