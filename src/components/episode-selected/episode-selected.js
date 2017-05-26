// @flow
import React from 'react';
import { browserHistory } from 'react-router';
import classnames from 'classnames';
import EpisodeDescription from './parts/episode-description';
import VideoPlayer from '../video-player-container/parts/video-player';
import PlayLogo from '../../../public/assets/play-logo.svg';
import './episode-selected.css';

type EpisodeSelectedType = {
  id: number,
  url: string,
  title: string,
  subtitle: string,
  description: string,
  closePopupFunction: Function,
  videoUrl: string,
  seriesId: number,
  isSelectedHomeContainer: boolean,
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
      isSelectedHomeContainer,
      seriesId,
      id,
    } = this.props;
    switch (event.code) {
      case 'ArrowUp':
        closePopupFunction(event);
        break;
      case 'ArrowLeft':
        if (isSelectedHomeContainer) {
          if (selectedItem > 0) {
            this.setState({
              selectedItem: selectedItem - 1,
            });
          }
        }
        break;
      case 'ArrowRight':
        if (isSelectedHomeContainer) {
          if (selectedItem < 1) {
            this.setState({
              selectedItem: selectedItem + 1,
            });
          }
        }
        break;
      case 'Backspace':
        closePopupFunction(event);
        break;
      case 'Enter':
        if (selectedItem === 0) {
          browserHistory.push(`/watch/${id}`);
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
      isSelectedHomeContainer,
    } = this.props;
    const {
      selectedItem,
    } = this.state;
    const playButtonClassName = classnames({
      'episode-selected__image': true,
      'episode-selected__image--selected': selectedItem === 0,
    });
    const learnMoreButtonClassname = classnames({
      'episode-buttons__learn': true,
      'episode-buttons__learn--selected': selectedItem === 1,
    });
    const learnMoreButton = isSelectedHomeContainer ? (
      <div className={learnMoreButtonClassname} >
      Learn More
    </div>
  ): null;
    return (
      <div className="episode-selected">
        <div className="episode-selected__teaser-wrapper">
          <VideoPlayer
            videoUrl={videoUrl}
            showUI={false}
            posterImage={url}
            isMuted
            videoID={id}
          />
          <img className={playButtonClassName} src={PlayLogo} alt={title} />
        </div>
        <div className="episode-selected__info-container">
          <EpisodeDescription
            title={title} description={description} subtitle={subtitle}
            className="episode-description-wrapper"
          />
          <div className="episode-buttons">
            {learnMoreButton}
          </div>
        </div>
      </div>
    );
  }
}

export default episodeSelected;
