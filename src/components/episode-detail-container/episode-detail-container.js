// @flow
import React from 'react';
import {
  EpisodeDescriptionStructure,
  EpisodeCardsContainerStructure,
} from '../../structures/episode';
import { getSeriesByID, getEpisodeByID } from '../../api/fetch';
import EpisodeWatch from './episode-watch/episode-watch';
import EpisodeDescription from './episode-description/episode-description';
import EpisodeCard from './episode-card/episode-card';
import './episode-detail-container.css';

class EpisodeDetailContainer extends React.Component {
  static throwError(err) {
    return err;
  }
  static createEpisodeCard(episode, i) {
    return <EpisodeCard key={String(i)} url={episode.thumbnail.url} />;
  }

  constructor() {
    super();

    this.state = {
      episode: {},
      serie: {},
    };
  }
  state: {
    episode: EpisodeDescriptionStructure,
    serie: EpisodeCardsContainerStructure,
  }
  componentDidMount() {
    const episodeId : number = this.props.params.id;
    getEpisodeByID(episodeId)
    .then(this.changeState.bind(this, 'episode'))
    .catch(EpisodeDetailContainer.throwError);
    const serieId : number = 3;
    getSeriesByID(serieId)
    .then(this.changeState.bind(this, 'serie'))
    .catch(EpisodeDetailContainer.throwError);
  }
  props: {
    params: {
      id: number,
    }
  }

  changeState(key: string, data: EpisodeDescriptionStructure | EpisodeCardsContainerStructure) {
    this.setState({ [key]: data });
  }

  render() {
    const { episode, serie } = this.state;
    const { title, description, subtitle, id } = episode;
    const thumbnail = episode.thumbnail || {};
    const recommendedEpisodes = serie.published_episodes || [];
    return (
      <div className="episode-detail">
        <div className="episode-detail__details">
          <EpisodeWatch url={thumbnail.url} id={id} />
          <EpisodeDescription title={title} date={subtitle} description={description} />
        </div>
        <div className="episode-detail__recommended">
          <h1 className="episode-detail__recommended-title">Recommended</h1>
          <div className="episode-detail__recommended-card-wrapper">
            {recommendedEpisodes.slice(0, 4).map(EpisodeDetailContainer.createEpisodeCard)}
          </div>
        </div>
      </div>
    );
  }
}

export default EpisodeDetailContainer;
