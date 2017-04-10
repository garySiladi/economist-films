// @flow
import React from 'react';
import { EpisodeCardStructure } from '../../../structures/episode';
import './episode-card.css';

const EpisodeCard = ({ url }: EpisodeCardStructure) => {
  const card = {
    background: `#000 url(${url}) no-repeat center center `,
    backgroundSize: 'cover',
  };
  return <div className="episode-card" style={card} />;
};

export default EpisodeCard;
