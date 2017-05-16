// @flow
import React from 'react';
import classnames from 'classnames';
import { browserHistory } from 'react-router';
// $FlowFixMe
import 'video.js/dist/video-js.css';
import videojs from 'video.js';
import VideoPlayerControls from './video-player-controls';
import './video-player.css';
import Back from '../../../../public/assets/Square-Arrow.svg';
import { saveVideoProgress, getProgressTimeById } from '../../../api/local-storage';

window.videojs = videojs;
// eslint-disable-next-line
require('videojs-contrib-hls/dist/videojs-contrib-hls.js');

export type VideoPlayerPropsType = {
  videoUrl: string,
  videoID: number,
  showUI: boolean,
  isMuted: boolean,
  posterImage: ?string,
};
export type VideoPlayerStateType = {
  isVideoPlaying: boolean,
  timeProgress: number,
  isNavigationSelected: boolean,
  isBackButtonSelected: boolean,
  selectedPosition: number,
}

const videoJsOptions = (videoUrl: string, isMuted: boolean) => ({
  preload: 'auto',
  autoplay: true,
  muted: isMuted,
  controls: false,
  sources: [{
    src: videoUrl,
    type: 'application/x-mpegURL',
  }],
});

class VideoPlayer extends React.Component {
  static getProgress(player) {
    return (100 / player.duration()) * player.currentTime();
  }
  static renderTime(time) {
    let minutes = Math.floor(time / 60);
    let seconds = time - (minutes * 60);
    minutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    seconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${minutes}:${seconds}`;
  }
  constructor(props: VideoPlayerPropsType) {
    super(props);
    (this: any).moveTime = 10;
    (this: any).videoNode = null;
    (this: any).player = null;
    this.state = {
      isVideoPlaying: true,
      timeProgress: 0,
      selectedPosition: 1,
      isBackButtonSelected: false,
      isNavigationSelected: true,
    };
    (this: any).handleFastForward = this.handleFastForward.bind(this);
    (this: any).handlePlay = this.handlePlay.bind(this);
    (this: any).handlePause = this.handlePause.bind(this);
    (this: any).handleRewind = this.handleRewind.bind(this);
    (this: any).handleVideoLoad = this.handleVideoLoad.bind(this);
    (this: any).handleEndReached = this.handleEndReached.bind(this);
    (this: any).handleTimeUpdate = this.handleTimeUpdate.bind(this);
    (this: any).showFormattedTime = this.showFormattedTime.bind(this);
    (this: any).handleKeyPress = this.handleKeyPress.bind(this);
    (this: any).handlePlayPause = this.handlePlayPause.bind(this);
  }
  state: VideoPlayerStateType;
  componentDidMount() {
    const {
      videoUrl,
      isMuted,
    } = this.props;
    (this: any).player = videojs((this: any).videoNode, { ...videoJsOptions(videoUrl, isMuted) });
    document.addEventListener('keydown', this.handleKeyPress);
  }
  componentWillUnmount() {
    if ((this: any).player) {
      const { videoID: id } = this.props;
      const timeProgress: number = Math.round((this: any).player.currentTime());
      saveVideoProgress(id, timeProgress);
      (this: any).player.dispose();
    }
    document.removeEventListener('keydown', this.handleKeyPress);
  }
  handleKeyPress(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowUp':
        (this: any).setState({
          isBackButtonSelected: true,
          isNavigationSelected: false,
          selectedPosition: null,
        });
        break;
      case 'ArrowDown':
        (this: any).setState({
          isNavigationSelected: true,
          isBackButtonSelected: false,
          selectedPosition: 1,
        });
        break;
      case 'ArrowLeft':
        this.moveLeft();
        break;
      case 'ArrowRight':
        this.moveRight();
        break;
      case 'Enter':
        if (this.state.isBackButtonSelected) {
          (this: any).setState({
            isBackButtonSelected: false,
          });
          browserHistory.goBack();
        } else {
          if (this.state.selectedPosition === 0) {
            this.handleRewind();
          }
          if ((this: any).state.selectedPosition === 1) {
            this.handlePlayPause();
          }
          if (this.state.selectedPosition === 2) {
            this.handleFastForward();
          }
        }
        break;
      case 'Backspace':
        if (this.props.showUI) {
          browserHistory.goBack();
        }
        break;
      default:
    }
  }
  moveLeft() {
    if (this.state.isNavigationSelected) {
      if (this.state.selectedPosition > 0) {
        this.setState({
          selectedPosition: this.state.selectedPosition -1,
        });
      }
    }
  }
  moveRight() {
    if (this.state.isNavigationSelected) {
      if (this.state.selectedPosition < 2) {
        this.setState({
          selectedPosition: this.state.selectedPosition +1,
        });
      }
    }
  }
  handlePlayPause() {
    if (this.state.isVideoPlaying) {
      this.handlePause();
    } else {
      this.handlePlay();
    }
  }
  handlePlay() {
    this.setState({
      isVideoPlaying: true,
    });
    (this: any).player.play();
  }
  handlePause() {
    this.setState({
      isVideoPlaying: false,
    });
    (this: any).player.pause();
  }
  handleRewind() {
    (this: any).player.currentTime((this: any).player.currentTime() - (this: any).moveTime);
  }
  handleFastForward() {
    if ((this: any).player.remainingTime() > 10) {
      (this: any).player.currentTime((this: any).player.currentTime() + (this: any).moveTime);
    }
  }
  handleVideoLoad() {
    const { videoID: id } = this.props;
    const lagTime = 5;
    const lastTimeProgress: number = getProgressTimeById(id);
    (this: any).player.currentTime(lastTimeProgress - lagTime);
  }
  handleEndReached() {
    this.setState({
      isVideoPlaying: false,
    });
  }
  handleTimeUpdate() {
    const progress = VideoPlayer.getProgress((this: any).player);
    this.setState({
      timeProgress: Math.round(progress),
    });
  }
  showFormattedTime(getTime: Function) {
    let time = '00:00';
    if ((this: any).player) {
      const roundedTime = Math.round(getTime((this: any).player));
      time = VideoPlayer.renderTime(roundedTime);
    }
    return time;
  }
  render() {
    const {
      showUI,
      posterImage,
    } = this.props;
    const videoBackButtonClassName = classnames({
      'video-player-back-button': true,
      selected: this.state.isBackButtonSelected,
    });
    const videoPlayerControls = showUI ? (
      <VideoPlayerControls
        isVideoPlaying={this.state.isVideoPlaying}
        progress={this.state.timeProgress}
        currentTime={this.showFormattedTime(player => player.currentTime())}
        endOfVideo={this.showFormattedTime(player => player.duration())}
        selectedPosition={this.state.selectedPosition}
      />
    ) : null;
    const backButton = showUI ? (
      <button className={videoBackButtonClassName} >
        <img src={Back} alt="Back" className="video-player-back-icons" />
      </button>
    ) : null;
    return (
      <div className="video-player">
        <div data-vjs-player>
          {backButton}
          <video
            ref={(node) => { (this: any).videoNode = node; }}
            onLoadedData={this.handleVideoLoad}
            onEnded={this.handleEndReached}
            onTimeUpdate={this.handleTimeUpdate}
            className="video-js vjs-big-play-centered"
            poster={posterImage}
          />
          {videoPlayerControls}
        </div>
      </div>);
  }
}

export default VideoPlayer;
