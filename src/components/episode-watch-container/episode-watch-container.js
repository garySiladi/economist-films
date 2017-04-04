// @flow
import React from 'react';
import { EpisodeWatchStructure } from '../../structures/episode';
import { getEpisodeByID } from '../../api/fetch';
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
    const episodeId : number = 7;
    getEpisodeByID(episodeId)
    .then((episode7) => {
      const url : string = episode7.thumbnail.landscape.url;
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
