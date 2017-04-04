// @flow
import React from 'react';
import { EpisodeCardsContainerStructure } from '../../structures/episode';
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
    const REST_API = 'https://economist.twivel.io/api/v1/root/json';
    fetch(REST_API)
      .then(response => response.json())
      .then((data) => {
        const shelvesArr : Array<Object> = data.shelves.map(shelve => shelve);
        const serieSample : Array<Object> = shelvesArr[4].items;
        const recommendedArr : Array<string> =
          serieSample.map(episode => episode.thumbnail.landscape.url);
        const keys : Array<number> = serieSample.map(episode => episode.id);
        const keysObjs : Array<Object> = keys.map(currId => ({ id: currId }));
        const recommendedObjs : Array<Object> = recommendedArr.map(currImg =>
          ({ landscape: currImg }));
        const recommended = [];
        for (let i = 0; i < recommendedObjs.length; i+=1) {
          recommended.push(Object.assign({}, keysObjs[i], recommendedObjs[i]));
        }
        this.setState({
          recommended,
        });
      });
  }
  renderRecommended() {
    const { recommended } = this.state;
    return (
      <div className="episode-cards__wrapper">
        {recommended.map(episode =>
          <EpisodeCard key={episode.id} url={episode.landscape} />,
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
