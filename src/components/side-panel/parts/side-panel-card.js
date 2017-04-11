// @flow
import React from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';
import './side-panel-card.css';

export type SidePanelCardType = {
  href: string,
  icon: string,
  title: string,
  isActive?: boolean,
  onClick?: Function, // eslint-disable-line
};

const SidePanelCard = ({ href, icon, title, isActive, onClick }: SidePanelCardType) => (
  <Link
    onClick={onClick}
    to={href}
    className={classnames({
      'side-panel-card': true,
      'side-panel-card--active': isActive,
    })}
  >
    <svg
      width="60"
      height="60"
      className={classnames({
        'side-panel-card__icon': true,
        [`side-panel-card__icon--${icon}`]: true,
      })}
    >
      <circle cx="30" cy="30" r="29" stroke="silver" strokeWidth="2" fill="white" />
    </svg>
    <span className="side-panel-card__title">{title}</span>
  </Link>
);

SidePanelCard.defaultProps = {
  isActive: false,
};

export default SidePanelCard;
