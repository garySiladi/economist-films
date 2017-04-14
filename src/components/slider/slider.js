// @flow
import React from 'react';
import SliderItem from './parts/slider-item/slider-item';
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
            <SliderItem {...item} key={item.title} />,
          )}
        </div>
      </div>
    );
  }
}

export default Slider;
