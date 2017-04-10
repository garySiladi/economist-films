// @flow
import React from 'react';
import { EpisodeWatchStrucutre } from '../../../structures/episode';
import './episode-watch.css';

const EpisodeWatch = ({ url }: EpisodeWatchStrucutre) => {
  const videoImg = {
    background: `#000 url("${url}") center/cover no-repeat`,
  };
  return (
    <div className="episode-watch">
      <div className="episode-watch__video" style={videoImg} />
      <button className="episode-watch__watchnow-button">Watch now</button>
    </div>
  );
};

export default EpisodeWatch;
