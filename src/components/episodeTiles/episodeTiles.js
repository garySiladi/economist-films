// @flow
import React from 'react';
import EpisodeTile from './episodeTile/episodeTile';
import './episodeTiles.css';

const EpisodeTiles = () => (
  <div className="episode-tiles" >
    <h1 className="episode-tiles-title">Recommended</h1>
    <EpisodeTile />
    <EpisodeTile />
    <EpisodeTile />
    <EpisodeTile />
  </div>
);

export default EpisodeTiles;
