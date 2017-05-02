// @flow
import React from 'react';
import { browserHistory, Link } from 'react-router';
import classnames from 'classnames';
import EpisodeDescription from './parts/episode-description';
import './episode-selected.css';

type EpisodeSelectedType = {
  id: number,
  url: string,
  title: string,
  subtitle: string,
  description: string,
  closePopupFunction: ?Function,
};

class episodeSelected extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedItem: 0,
    };
    (this: any).handleKeyPress = this.handleKeyPress.bind(this);
  }
  state: {
    selectedItem: number,
  }
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }
  handleKeyPress(event: KeyboardEvent) {
    event.preventDefault();
    const {
      selectedItem,
    } = this.state;
    const {
      closePopupFunction,
    } = this.props;
    switch (event.key) {
      case 'ArrowUp':
        if (closePopupFunction) closePopupFunction(event);
        break;
      case 'ArrowLeft':
        if (selectedItem > 0) {
          this.setState({
            selectedItem: selectedItem - 1,
          });
        }
        break;
      case 'ArrowRight':
        if (selectedItem < 2) {
          this.setState({
            selectedItem: selectedItem + 1,
          });
        }
        break;
      case 'Backspace':
        if (closePopupFunction) closePopupFunction(event);
        break;
      case 'Enter':
        browserHistory.push(`/watch/${this.props.id}`);
        break;
      default:
    }
  }
  props: EpisodeSelectedType;
  render() {
    const {
      id,
      url,
      subtitle,
      title,
      description,
    } = this.props;
    const {
      selectedItem,
    } = this.state;
    const watchString = `/watch?id=${id}`;
    const learnString = `/learn?id=${id}`;
    const imageClassName = classnames(
      'episode-selected__image',
      { 'episode-selected__image--selected': selectedItem === 0 },
    );
    return (
      <div className="episode-selected">
        <div className="episode-selected__image-wrapper">
          <img className={imageClassName} src={url} alt={title} />
        </div>
        <div className="episode-selected__info-container">
          <EpisodeDescription
            title={title} description={description} subtitle={subtitle}
            className="episode-description-wrapper"
          />
          <div className="episode-buttons">
            <Link
              className={classnames(
                'episode-buttons__watch',
                { 'episode-buttons__watch--selected': selectedItem === 1 },
              )}
              to={watchString}
            >
              Watch Now
            </Link>
            <Link
              className={classnames(
                'episode-buttons__learn',
                { 'episode-buttons__learn--selected': selectedItem === 2 },
              )}
              to={learnString}
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default episodeSelected;
