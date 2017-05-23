// @flow
import React from 'react';
import './series-description.css';

type SeriesContainerObj = {
  backgroundUrl: string,
  description: string,
  seriesLogoUrl: string,
  sponsorLogoUrl: string
};

const SeriesDescription =
  ({ backgroundUrl, description, seriesLogoUrl, sponsorLogoUrl }: SeriesContainerObj) => {
    const descriptionBackgroundStyle = {
      backgroundImage: `url(${backgroundUrl})`,
      height: '100vh',
    };
    const seriesLogoStyle = {
      background: `url(${seriesLogoUrl}) bottom center no-repeat`,
    };
    const sponsorLogoStyle = {
      background: `url(${sponsorLogoUrl}) center center no-repeat`,
    };
    return (
      <div style={descriptionBackgroundStyle}>
        <div className="series-description">
          <div className="series-description__series-logo" style={seriesLogoStyle} />
          <div className="series-description__description">{description}</div>
          <div className="series-description__right-wrapper">
            <div className="series-description__supporter-logo" style={sponsorLogoStyle} />
            <div
              className="series-description__watchnow-btn"
              role="button"
              to="/"
            >{'Watch now'}
            </div>
          </div>
        </div>
        <div className="gradient-cover" />
      </div>
    );
  };

export default SeriesDescription;
