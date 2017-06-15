// @flow
import React from 'react';
import { browserHistory } from 'react-router';
import classnames from 'classnames';
import EpisodeDescription from './parts/episode-description';
import VideoPlayer from '../video-player-container/parts/video-player';
import SquareArrow from '../../../public/assets/Square-Arrow.svg';
import './episode-selected.css';

type EpisodeSelectedType = {
  id: number,
  url: string,
  title: string,
  subtitle: string,
  description: string,
  closePopupFunction: Function,
  hideSidebarFunction: Function,
  videoUrl: string,
  seriesId: number,
  isSelectedHomeContainer: boolean,
  isShown: boolean,
  hideButtons?: boolean,
};

class episodeSelected extends React.Component {
  static defaultProps = {
    hideButtons: true,
  };
  constructor() {
    super();
    this.state = {
      selectedItem: 0,
      isVideoExpanded: false,
    };
    (this: any).handleKeyPress = this.handleKeyPress.bind(this);
    (this: any).handleVideoExpansion = this.handleVideoExpansion.bind(this);
  }
  state: {
    selectedItem: number,
    isVideoExpanded: boolean,
  }
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }
  handleVideoExpansion(position: boolean) {
    this.setState({
      isVideoExpanded: position,
    });
    this.props.hideSidebarFunction(position);
  }
  handleKeyPress(event: KeyboardEvent) {
    const {
      selectedItem,
      isVideoExpanded,
    } = this.state;
    const {
      closePopupFunction,
      isSelectedHomeContainer,
      seriesId,
      id,
    } = this.props;
    if (isVideoExpanded) return;
    switch (event.code || event.which) {
      case 38:
      case 'ArrowUp':
        event.preventDefault();
        closePopupFunction(event);
        if (isSelectedHomeContainer) {
          browserHistory.replace('/');
        }
        break;
      case 'ArrowDown':
        event.preventDefault();
        break;
      case 'ArrowLeft':
        event.preventDefault();
        if (isSelectedHomeContainer) {
          if (selectedItem > 0) {
            this.setState({
              selectedItem: selectedItem - 1,
            });
          }
        }
        break;
      case 'ArrowRight':
        event.preventDefault();
        if (isSelectedHomeContainer) {
          if (selectedItem < 1) {
            this.setState({
              selectedItem: selectedItem + 1,
            });
          }
        }
        break;
      case 'Backspace':
        event.preventDefault();
        closePopupFunction(event);
        if (isSelectedHomeContainer) {
          browserHistory.replace('/');
        }
        break;
      case 'Enter':
        event.preventDefault();
        if (selectedItem === 0) {
          event.stopImmediatePropagation();
          this.handleVideoExpansion(true);
        }
        if (selectedItem === 1) {
          browserHistory.push(`/series/${seriesId}?expandedEpisode=${id}`);
        }
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
      videoUrl,
      isShown,
      hideButtons,
    } = this.props;
    const {
      selectedItem,
      isVideoExpanded,
    } = this.state;
    const episodesSelectedClassName = classnames({
      'episode-selected': true,
      'episode-selected--expanded': isShown,
    });
    const videoContainerClassName = classnames({
      'video-container': true,
      'video-container--expanded': isVideoExpanded,
    });
    const expandButtonClassName = classnames({
      'episode-selected__image': true,
      'episode-selected__image--selected': selectedItem === 0 && isShown,
    });
    return (
      <div className={episodesSelectedClassName}>
        <div className="episode-selected__teaser-wrapper">
          <div className={videoContainerClassName}>
            {isShown ? (
              <VideoPlayer
                videoUrl={videoUrl}
                episodeTitle={title}
                isVideoExpanded={isVideoExpanded}
                posterImage={url}
                videoID={id}
                handleVideoExpansion={this.handleVideoExpansion}
              />
            ) : null}
          </div>
          <div className={expandButtonClassName}>
            <img className="first-arrow" src={SquareArrow} alt={title} />
            <img className="second-arrow" src={SquareArrow} alt={title} />
          </div>
        </div>
        <div className="episode-selected__info-container">
          <EpisodeDescription
            title={title} description={description} subtitle={subtitle}
            className="episode-description-wrapper"
          />
          {hideButtons ? null : (
            <div className="episode-buttons">
              <div
                className={classnames({
                  'episode-buttons__learn': true,
                  'episode-buttons__learn--selected': selectedItem === 1,
                })}
              >
                Learn More
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default episodeSelected;
