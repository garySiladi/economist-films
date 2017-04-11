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
    .then((episode) => {
      this.setState({
        episode,
      });
    })
    .catch(err => err);
    const serieId : number = 3;
    getSeriesByID(serieId)
    .then((serie) => {
      this.setState({
        serie,
      });
    })
    .catch(err => err);
  }
  props: {
    params: {
      id: number,
    }
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
            {recommendedEpisodes.slice(0, 4).map((element, i) =>
              <EpisodeCard key={String(i)} url={element.thumbnail.url} />,
            )
            }
          </div>
        </div>
      </div>
    );
  }
}

export default EpisodeDetailContainer;
