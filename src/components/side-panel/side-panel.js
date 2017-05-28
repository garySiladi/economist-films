// @flow
import React from 'react';
import { browserHistory } from 'react-router';
import classnames from 'classnames';
import SidePanelCard from './parts/side-panel-card';
import './side-panel.css';
import SearchIcon from '../../../public/assets/Search.svg';
import HomeIcon from '../../../public/assets/Home.svg';
import FavoritesIcon from '../../../public/assets/Favorites.svg';
import type { SidePanelCardType } from './parts/side-panel-card';

export type SidePanelPropsType = {
  user: {
    id: number,
    name: string,
    imgUrl: string,
  },
  isSelected?: boolean,
}

type SidePanelStateType = {
  selectedCard: number,
  cards: Array<SidePanelCardType>,
}

const sidePanelOptions = [
  {
    href: '/search',
    icon: SearchIcon,
    title: 'Search',
  },
  {
    href: '/',
    icon: HomeIcon,
    title: 'Home',
  },
  {
    href: '/favorites',
    icon: FavoritesIcon,
    title: 'Favorites',
  },
];

class SidePanel extends React.Component {
  static defaultProps = {
    isSelected: false,
  };

  constructor(props: SidePanelPropsType) {
    super(props);
    const {
      id: userId,
      name: userName,
      imgUrl: userImg,
    } = props.user;
    this.state = {
      selectedCard: 1,
      cards: [
        { href: `/user/${userId}`, icon: userImg, title: userName },
      ].concat(sidePanelOptions),
    };

    (this: any).handleKeyPress = this.handleKeyPress.bind(this);
    (this: any).createSidePanelCard = this.createSidePanelCard.bind(this);
  }

  state: SidePanelStateType;

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillReceiveProps(nextProps: SidePanelPropsType) {
    if (this.props.isSelected && !nextProps.isSelected) {
      this.setState({ selectedCard: 1 });
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  createSidePanelCard(cardData: SidePanelCardType, i: number) {
    return (
      <li
        key={String(i)}
        className={classnames({
          'side-panel__option': true,
          'side-panel__option--active': this.state.selectedCard === i || false,
        })}
      >
        <SidePanelCard {...cardData} />
      </li>
    );
  }

  handleKeyPress(event: KeyboardEvent) {
    if (this.props.isSelected) {
      switch (event.code) {
        case 'ArrowUp': {
          const newPosition = this.state.selectedCard > 0 ? this.state.selectedCard - 1 : 0;
          this.setState({
            selectedCard: newPosition,
          });
          break;
        }
        case 'ArrowDown': {
          const newPosition = this.state.selectedCard < this.state.cards.length - 1 ?
            this.state.selectedCard + 1 : this.state.cards.length - 1;
          this.setState({
            selectedCard: newPosition,
          });
          break;
        }
        case 'Enter': {
          browserHistory.push(this.state.cards[this.state.selectedCard].href);
          break;
        }
        default: {
          break;
        }
      }
    }
  }

  props: SidePanelPropsType;

  render() {
    return (
      <div
        className={classnames({
          'side-panel': true,
          'side-panel--expanded': this.props.isSelected,
        })}
      >
        <ul className="side-panel__option-list">
          {this.state.cards.map(this.createSidePanelCard)}
        </ul>
      </div>
    );
  }
}

export default SidePanel;
