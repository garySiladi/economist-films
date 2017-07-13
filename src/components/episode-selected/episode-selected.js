// @flow
import React from 'react';
import { browserHistory } from 'react-router';
import classnames from 'classnames';
import EpisodeDescription from './parts/episode-description';
import VideoPlayer from '../video-player-container/parts/video-player';
import SquareArrow from '../../../public/assets/Square-Arrow.svg';
import './episode-selected.css';
import type { SeriesType } from '../app/app';

type EpisodeSelectedType = {
  id: number,
  url: string,
  title: string,
  subtitle: string,
  description: string,
  selectedSeries: number,
  closePopupFunction: Function,
  selectLowerSeries: Function,
  hideSidebarFunction: Function,
  videoUrl: string,
  series: Array<SeriesType>,
  seriesId: ?number,
  isSelectedHomeContainer: boolean,
  isShown: boolean,
  hideButtons?: boolean,
};

class EpisodeSelected extends React.Component {
  static defaultProps = {
    hideButtons: true,
  };
  static handleLearnMore(seriesId, id) {
    if (seriesId) {
      browserHistory.push(`/series/${seriesId}?expandedEpisode=${id}`);
    }
  }
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
      selectLowerSeries,
      selectedSeries,
      isSelectedHomeContainer,
      series,
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
      case 40:
      case 'ArrowDown':
        event.preventDefault();
        if (isSelectedHomeContainer) {
          closePopupFunction(event);
          selectLowerSeries(selectedSeries, series.length);
          browserHistory.replace('/');
        }
        break;
      case 37:
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
      case 39:
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
      case 8:
      case 'Backspace':
        event.preventDefault();
        closePopupFunction(event);
        if (isSelectedHomeContainer) {
          browserHistory.replace('/');
        }
        break;
      case 13:
      case 'Enter':
        event.preventDefault();
        if (selectedItem === 0) {
          event.stopImmediatePropagation();
          this.handleVideoExpansion(true);
        }
        if (selectedItem === 1) {
          EpisodeSelected.handleLearnMore(seriesId, id);
        }
        break;
      default:
    }
  }
  props: EpisodeSelectedType;
  render() {
    const {
      id,
      seriesId,
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
          <div // eslint-disable-line jsx-a11y/no-static-element-interactions
            className={videoContainerClassName}
            onClick={this.handleVideoExpansion}
          >
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
              <div // eslint-disable-line jsx-a11y/no-static-element-interactions
                onClick={() => EpisodeSelected.handleLearnMore(seriesId, id)}
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

export default EpisodeSelected;
