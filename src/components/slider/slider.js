// @flow
import React from 'react';
import { Link } from 'react-router';
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
    return (
      <div className={this.props.className}>
        <div className="slider-title">{this.props.sliderTitle}</div>
        <div className="slider-items">
          {this.props.data.map(item =>
            <Link className="slider-item" key={item.title} to={`/episode/${item.id}`}>
              <img
                src={item.thumbnail ? item.thumbnail.thumb.url : ''}
                alt={item.title}
                className="slider-image"
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
            </Link>,
          )}
        </div>
      </div>
    );
  }
}

export default Slider;
