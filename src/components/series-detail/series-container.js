// @flow
import React from 'react';
import { getSeriesByID } from '../../api/fetch';
import './series-container.css';

export type SeriesContainerProps = {
  params: Object,
}
export type SeriesContainerState = {
  episodes: Array<Object>,
  series: Object,
}

class SeriesContainer extends React.Component {
  constructor(props: SeriesContainerProps) {
    super(props);
    this.state = {
      episodes: [],
      series: {},
    };
  }
  state: SeriesContainerState
  componentWillMount() {
    getSeriesByID(this.props.params.id)
    .then((series) => {
      this.setState({
        episodes: series.published_episodes,
        series,
      });
      // console.log(this.state.episodes);
    });
  }
  render() {
    const episodes = this.state.episodes.map(data =>
      (
        <div
          key={data.title}
        >
          {data.title}
        </div>
      ),
    );
    return (
      <div className="series-container"> {episodes} </div>
    );
  }
}
export default SeriesContainer;
