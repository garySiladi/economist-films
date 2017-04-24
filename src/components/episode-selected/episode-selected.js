// @flow
import React from 'react';
import { Link } from 'react-router';
import EpisodeDescription from './parts/episode-description';
import './episode-selected.css';

type EpisodeSelectedType = {
  id: number,
  url: string,
  title: string,
  subtitle: string,
  description: string
};

const episodeSelected = ({ id, url, subtitle, title, description }: EpisodeSelectedType) => {
  const watchString : string = `/watch?id=${id}`;
  const learnString : string = `/learn?id=${id}`;
  return (
    <div className="episode-selected">
      <img className="episode-selected__image" src={url} alt={title} />
      <div className="episode-selected__info-container">
        <EpisodeDescription
          title={title} description={description} subtitle={subtitle}
          className="episode-description-wrapper"
        />
        <div className="episode-buttons">
          <Link className="episode-buttons__watch" to={watchString}>Watch Now</Link>
          <Link className="episode-buttons__learn" to={learnString}>Learn More</Link>
        </div>
      </div>
    </div>
  );
};

export default episodeSelected;
