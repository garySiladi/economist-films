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
  hideSidebarFunction: Function,
  videoUrl: string,
  seriesId: number,
  isSelectedHomeContainer: boolean,
};

class episodeSelected extends React.Component {
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
    switch (event.code) {
      case 'ArrowUp':
        event.preventDefault();
        closePopupFunction(event);
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
        if (!event.comingFromVideo) closePopupFunction(event);
        break;
      case 'Enter':
        event.preventDefault();
        if (selectedItem === 0 && !event.comingFromVideo) {
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
      isSelectedHomeContainer,
    } = this.props;
    const {
      selectedItem,
      isVideoExpanded,
    } = this.state;
    const videoContainerClassName = classnames({
      'video-container': true,
      'video-container--expanded': isVideoExpanded,
    });
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
          <div className={videoContainerClassName}>
            <VideoPlayer
              videoUrl={videoUrl}
              episodeTitle={title}
              isVideoExpanded={isVideoExpanded}
              posterImage={url}
              videoID={id}
              handleVideoExpansion={this.handleVideoExpansion}
            />
          </div>
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
