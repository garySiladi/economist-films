// @flow
import React from 'react';
import { EpisodeWatchStructure } from '../../structures/episode';
import EpisodeWatch from './episode-watch/episode-watch';

class EpisodeWatchContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      url: '',
    };
  }
  state: {
    url: EpisodeWatchStructure,
  };
  componentDidMount() {
    const REST_API : string = 'https://economist.twivel.io/api/v1/root/json';
    fetch(REST_API)
      .then(response => response.json())
      .then((data) => {
        const itemsThumbnail : Object = data.shelves.map(shelve => shelve.items)
          .pop()[0].thumbnail;
        const url : string = itemsThumbnail.landscape.url;
        this.setState({
          url,
        });
      });
  }
  render() {
    const { url } = this.state;
    return (
      <EpisodeWatch url={url} />
    );
  }
}

export default EpisodeWatchContainer;
