// @flow
import React from 'react';
import classnames from 'classnames';
import SidePanelCard from './parts/side-panel-card';
import './side-panel.css';

export type SidePanelPropsType = {
  user: {
    id: number,
    name: string,
    imgUrl: string,
  },
  isSelected: boolean,
}

const sidePanelOptions = [
  {
    href: '/search',
    icon: 'search-icon',
    title: 'Search',
    isActive: true,
  },
  {
    href: '/home',
    icon: 'home-icon',
    title: 'Home',
  },
  {
    href: '/favorites',
    icon: 'favorites-icon',
    title: 'Favorites',
  },
];

class SidePanel extends React.Component {
  static createSidePanelCard(cardData, i) {
    return (
      <li
        key={String(i)}
        className={classnames({
          'side-panel__option': true,
          'side-panel__option--active': cardData.isActive || false,
        })}
      >
        <SidePanelCard {...cardData} />
      </li>
    );
  }

  props: SidePanelPropsType;

  render() {
    const {
      id: userId,
      name: userName,
      imgUrl: userImg,
    } = this.props.user;
    const userObj = {
      href: `/user/${userId}`,
      icon: userImg,
      title: userName,
    };
    return (
      <div
        className={classnames({
          'side-panel': true,
          'side-panel--expanded': this.props.isSelected,
        })}
      >
        <ul className="side-panel__option-list">
          {[userObj].concat(sidePanelOptions).map(SidePanel.createSidePanelCard)}
        </ul>
      </div>
    );
  }
}

export default SidePanel;
