// @flow
import React from 'react';
import RootStructure from '../../structures/root';
import { getRoot } from '../../api/fetch';
import NotificationBar from '../notification-bar/notificaton-bar';
import Slider from '../slider/slider';
import './home-container.css';

class HomeContainer extends React.Component {
  static findSeriesByTitle(title: string, shelves: Array<Object>) {
    return shelves.find(item => item.title === title);
  }
  constructor() {
    super();
    this.state = {
      series: {},
    };
  }
  state: {
     series: RootStructure
  };
  componentWillMount() {
    getRoot()
    .then((data) => {
      this.setState({ series: data });
    });
  }
  render() {
    const { shelves = [] } = this.state.series;
    const allSeries = HomeContainer.findSeriesByTitle('All series', shelves);
    const sliderProps = allSeries ? {
      sliderTitle: allSeries.title,
    } : null;
    const homePageContent = shelves.length > 0 ?
    (
      <div className="home-container">
        <NotificationBar />
        <Slider
          data={shelves[1].items}
          className="home-slider"
          sliderTitle={shelves[1].title}
        />
        <Slider
          data={shelves[0].items}
          className="home-slider"
          sliderTitle={shelves[0].title}
        />
        <Slider
          data={allSeries ? allSeries.items : []}
          className="home-slider"
          {...sliderProps}
        />
      </div>
    )
    : null;
    console.log(shelves.length, this.state);
    return homePageContent;
  }
}
export default HomeContainer;
