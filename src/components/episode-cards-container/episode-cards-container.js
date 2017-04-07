// @flow
import React from 'react';
import { EpisodeCardsContainerStructure } from '../../structures/episode';
import { getSeriesByID } from '../../api/fetch';
import EpisodeCard from './episode-card/episode-card';
import './episode-cards-container.css';

class EpisodeCardsContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      recommended: [],
    };
  }
  state: {
    recommended: EpisodeCardsContainerStructure,
  }
  componentDidMount() {
    const serieId = 3;
    getSeriesByID(serieId)
    .then((serie) => {
      const episodes : Array<Object> = [...serie.published_episodes].slice(0, 4);
      const keysNums : Array<number> = episodes.map(currEpisode => currEpisode.id);
      const keysObjs : Array<Object> = keysNums.map(currId => ({ key: currId }));
      const urlArr : Array<string> =
        episodes.map(currEpisode => currEpisode.thumbnail.landscape.url);
      const urlObjs : Array<Object> = urlArr.map(currUrl => ({ url: currUrl }));
      const recommended : Array<Object> = [];
      for (let i = 0; i < keysObjs.length; i+=1) {
        recommended.push(Object.assign({}, keysObjs[i], urlObjs[i]));
      }
      this.setState({
        recommended,
      });
    })
    .catch(err => console.log(err));
  }
  renderRecommended() {
    const { recommended } = this.state;
    return (
      <div className="episode-cards__wrapper">
        {recommended.map((episode, i) =>
          <EpisodeCard key={String(i)} url={episode.url} />,
        )
        }
      </div>
    );
  }
  render() {
    return (
      <div className="episode-cards" >
        <h1 className="episode-cards__title">Recommended</h1>
        {this.renderRecommended()}
      </div>
    );
  }
}

export default EpisodeCardsContainer;
