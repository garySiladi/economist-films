// @flow
import React from 'react';
import EpisodeDescription from './episode-description/episode-description';
import { getEpisodeByID } from '../../api/fetch';
import { EpisodeDescriptionStructure } from '../../structures/episode';

class EpisodeDescriptionContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      title: '...loading...',
      date: '...loading...',
      description: '...loading...',
    };
  }
  state: EpisodeDescriptionStructure;
  componentDidMount() {
    const episodeId : number = 7;
    getEpisodeByID(episodeId)
    .then((episode) => {
      const title : string = episode.title;
      const date : string = episode.updated_at.split(' ')[0];
      const description : string = episode.description;

      this.setState({
        title,
        date,
        description,
      });
    })
    .catch(err => console.log(err));
  }
  render() {
    const { title, date, description } = this.state;
    return (
      <EpisodeDescription title={title} date={date} description={description} />
    );
  }
}

export default EpisodeDescriptionContainer;
