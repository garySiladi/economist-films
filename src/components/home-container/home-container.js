// @flow
import React from 'react';
import RootStructure from '../../structures/root';
import { getRoot } from '../../api/fetch';
import Slider from '../slider/slider';
import './home-container.css';

class HomeContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      series: {},
    };
  }
  state: {
     series: RootStructure,
  };
  componentWillMount() {
    getRoot()
    .then((data) => {
      this.setState({ series: data });
    });
  }
  render() {
    const { shelves = [] } = this.state.series;
    const homePageContent = shelves.map(data =>
      (
        <Slider
          data={data.items}
          className="home-slider"
          sliderTitle={data.title}
          key={data.title}
        />
      ),
    );
    return (
      <div className="home-container">
        {homePageContent.splice(0, homePageContent.length - 2)}
      </div>
    );
  }
}
export default HomeContainer;
