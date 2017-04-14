// @flow
import React from 'react';
import { Link } from 'react-router';
import './slider-item.css';

const SliderItem = ({ item }: Object) => (
  <div>
    <Link className="slider-item" key={item.title} to={`/episode/${item.id}`}>
      <img
        src={item.thumbnail ? item.thumbnail.thumb.url : ''}
        alt={item.title}
        className="slider-item-image"
      />
      <div className="slider-item-container">
        <div className="slider-item-title">{item.title}</div>
        <div className="slider-item-subtitle">
          {item.type === 'Series' ?
            `${item.episode_count} episodes`
            : item.subtitle
          }
        </div>
      </div>
    </Link>
  </div>
);

export default SliderItem;
