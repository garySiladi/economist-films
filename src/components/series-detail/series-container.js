// @flow
import React from 'react';
import { getSeriesByID } from '../../api/fetch';
import './series-container.css';

export type SeriesContainerProps = {
  params: Object,
}
export type SeriesContainerState = {
  episodes: Array<Object>,
}

class SeriesContainer extends React.Component {
  constructor(props: SeriesContainerProps) {
    super(props);
    this.state = {
      episodes: [],
    };
  }
  state: SeriesContainerState
  componentWillMount() {
    getSeriesByID(this.props.params.id)
    .then((series) => {
      console.log(series);
    });
  }
  render() {
    return (
      <div className="series-container"> hello all </div>
    );
  }
}
export default SeriesContainer;
