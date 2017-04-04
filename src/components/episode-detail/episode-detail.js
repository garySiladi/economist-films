// @flow
import React from 'react';
import EpisodeDescriptionContainer from '../episode-description-container/episode-description-container';
import EpisodeWatchContainer from '../episode-watch-container/episode-watch-container';
import EpisodeCardsContainer from '../episode-cards-container/episode-cards-container';
import './episode-detail.css';

const EpisodeDetail = () => (
  <div className="episode-detail">
    <div className="episode-detail__details">
      <EpisodeWatchContainer />
      <EpisodeDescriptionContainer />
    </div>
    <div className="episode-detail__cards">
      <EpisodeCardsContainer />
    </div>
  </div>
);

export default EpisodeDetail;
