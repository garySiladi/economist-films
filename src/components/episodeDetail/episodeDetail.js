// @flow
import React from 'react';
import EpisodeDescription from '../episodeDescription/episodeDescription';
import EpisodeWatch from '../episodeWatch/episodeWatch';
import EpisodeTiles from '../episodeTiles/episodeTiles';
import './episodeDetail.css';

const EpisodeDetail = () => (
  <div className="episode-detail">
    <div className="episode-top-row">
      <EpisodeWatch />
      <EpisodeDescription />
    </div>
    <EpisodeTiles />
  </div>
);

export default EpisodeDetail;

