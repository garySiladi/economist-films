// @flow
import React from 'react';
import { Link } from 'react-router';
import { EpisodeWatchStrucutre } from '../../../structures/episode';
import './episode-watch.css';

const EpisodeWatch = ({ url, id }: EpisodeWatchStrucutre) => {
  const videoImg = {
    background: `#000 url("${url}") center/cover no-repeat`,
  };
  const episodeId : string = `/watch?id=${id}`;
  return (
    <div className="episode-watch">
      <div className="episode-watch__video" style={videoImg} />
      <Link
        to={episodeId}
        className="episode-watch__watchnow-button"
      >
        Watch now
      </Link>
    </div>
  );
};

export default EpisodeWatch;
