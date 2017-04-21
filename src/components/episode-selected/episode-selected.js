// @flow
import React from 'react';
import { Link } from 'react-router';
import EpisodeDescription from './episode-description/episode-description';
import './episode-selected.css';

type EpisodeSelectedType = {
  id: number,
  url: string,
  title: string,
  subtitle: string,
  description: string
};

const episodeSelected = ({ id, url, subtitle, title, description }: EpisodeSelectedType) => {
  // const videoImg = {
  //   background: `#000 url("${url}") center/cover no-repeat`,
  // };
  const watchString : string = `/watch?id=${id}`;
  const learnString : string = `/learn?id=${id}`;
  return (
    <div className="episode-selected">
      <img className="episode-selected__screen" src={url} alt="ooga" />
      <div className="episode-selected__desc-btns">
        <EpisodeDescription
          title={title} description={description} subtitle={subtitle}
          className="episode-selected__desc-btns__description"
        />
        <div className="episode-selected__desc-btns__wrapper">
          <Link className="episode-selected__desc-btns__watch-now-btn" to={watchString}>Watch Now</Link>
          <Link className="episode-selected__desc-btns__learn-more-btn" to={learnString}>Learn More</Link>
        </div>
      </div>
    </div>
  );
};

export default episodeSelected;
