// @flow
import React from 'react';
import { EpisodeDescriptionStructure } from '../../../structures/episode';
import './episode-description.css';

const EpisodeDescription = ({ date, title, description }: EpisodeDescriptionStructure) => (
  <div className="episode-description">
    <h3 className="episode-description__date">{date}</h3>
    <h1 className="episode-description__title">{title}</h1>
    <p className="episode-description__text">{description}</p>
  </div>
);

export default EpisodeDescription;
