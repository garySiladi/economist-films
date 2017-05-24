// @flow
import React from 'react';
import './series-description.css';

type SeriesContainerObj = {
  backgroundUrl: string,
  description: string,
  seriesLogoUrl: string,
  sponsorLogoUrl: string
};

const SeriesDescription = ({
    backgroundUrl,
    description,
    seriesLogoUrl,
    sponsorLogoUrl,
  }: SeriesContainerObj) => {
  const descriptionBackgroundStyle = {
    backgroundImage: `url(${backgroundUrl})`,
  };
  return (
    <div className="series-description__parent" style={descriptionBackgroundStyle}>
      <div className="gradient-cover" />
      <div className="series-description">
        <div className="series-description__series-logo series-description__flex-child">
          <img
            className="series-description__logo-img"
            src={seriesLogoUrl}
            alt={'sponsor logo'}
          />
        </div>
        <div
          className="series-description__description series-description__flex-child"
        >
          {description}
        </div>
        <div className="series-description__right-wrapper series-description__flex-child">
          <div className="series-description__supporter-logo">
            <img
              className="series-description__logo-img"
              src={sponsorLogoUrl}
              alt={'supporter logo'}
            />
          </div>
          <div
            className="series-description__watchnow-btn"
            role="button"
            to="/"
          >
            {'Watch now'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeriesDescription;
