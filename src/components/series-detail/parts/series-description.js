// @flow
import React from 'react';
import classnames from 'classnames';
import './series-description.css';

type SeriesContainerObj = {
  description: string,
  seriesLogoUrl: ?string,
  sponsorLogoUrl: ?string,
  isWatchnowBtnSelected: boolean,
};

const SeriesDescription = ({
  description,
  seriesLogoUrl,
  sponsorLogoUrl,
  isWatchnowBtnSelected,
}: SeriesContainerObj) => {
  const watchnowBtnClass = classnames({
    'series-description__watchnow-btn': true,
    'series-description__watchnow-btn--selected': isWatchnowBtnSelected,
  });
  return (
    <div className="series-description__parent">
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
          <div className="series-description__sponsor-logo">
            <img
              className="series-description__logo-img"
              src={sponsorLogoUrl}
              alt={sponsorLogoUrl ? 'sponsor logo' : ''}
            />
          </div>
          <div
            className={watchnowBtnClass}
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
