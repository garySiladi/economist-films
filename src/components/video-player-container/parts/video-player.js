// @flow
import React from 'react';
// $FlowFixMe
import 'video.js/dist/video-js.css';
import videojs from 'video.js';
import VideoPlayerInterface from './video-player-controls';
import './video-player.css';
import * as LS from '../../../api/local-storage';

window.videojs = videojs;
// eslint-disable-next-line
require('videojs-contrib-hls/dist/videojs-contrib-hls.js');

export type VideoPlayerPropsType = {
  episodeTitle: string,
  videoUrl: string,
  videoID: number,
  isVideoExpanded: boolean,
  posterImage: ?string,
  handleVideoExpansion: Function,
};
export type VideoPlayerStateType = {
  isVideoPlaying: boolean,
  timeProgress: number,
  isNavigationSelected: boolean,
  isBackButtonSelected: boolean,
  selectedPosition: number,
  showInterface: boolean,
}

const videoJsOptions = (videoUrl: string) => ({
  preload: 'auto',
  autoplay: true,
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
  static saveVideoTime(player, id) {
    const currentTime = Math.round(player.currentTime());
    const duration = Math.round(player.duration());
    const diff = duration - currentTime;
    const currentTimePerc = 100 - Math.round((diff / duration) * 100);
    LS.saveVideoProgress(id, currentTimePerc);
  }
  static createVideoSaver(player, videoId) {
    return setInterval(() => {
      VideoPlayer.saveVideoTime(player, videoId);
    }, 1000);
  }
  static getEpisodesIDs(allSeries) {
    if (!allSeries) {
      return 'loading';
    }
    const episodeIDs: Array<number> = allSeries.published_episodes.map(episode => episode.id);
    return LS.getLastWatchedEpisodeID(episodeIDs)
      ? LS.getLastWatchedEpisodeID(episodeIDs) : episodeIDs[0];
  }
  constructor(props: VideoPlayerPropsType) {
    super(props);
    (this: any).moveTime = 10;
    (this: any).videoNode = null;
    (this: any).player = null;
    (this: any).videoSaver = null;
    (this: any).videoShower = null;
    this.state = {
      isVideoPlaying: true,
      timeProgress: 0,
      selectedPosition: 1,
      isBackButtonSelected: false,
      isNavigationSelected: true,
      showInterface: false,
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
    (this: any).hideInterface = this.hideInterface.bind(this);
    (this: any).handleEventSource = this.handleEventSource.bind(this);
  }
  state: VideoPlayerStateType;
  componentDidMount() {
    const {
      videoID,
      videoUrl,
      isVideoExpanded,
    } = this.props;
    (this: any).player = videojs((this: any).videoNode, { ...videoJsOptions(videoUrl) });
    (this: any).player.muted(!isVideoExpanded);
    (this: any).videoSaver = VideoPlayer.createVideoSaver((this: any).player, videoID);
    document.addEventListener('keydown', this.handleKeyPress);
  }
  componentDidUpdate() {
    if ((this: any).player) {
      (this: any).player.muted(!this.props.isVideoExpanded);
    }
  }
  componentWillUnmount() {
    clearInterval((this: any).videoSaver);
    clearTimeout((this: any).videoShower);
    document.removeEventListener('keydown', this.handleKeyPress);
  }
  handleEventSource(event: KeyboardEvent) {
    const {
      isVideoExpanded,
      handleVideoExpansion,
    } = this.props;
    // $FlowFixMe
    event.comingFromVideo = true; // eslint-disable-line
    handleVideoExpansion(!isVideoExpanded);
  }
  handleKeyPress(event: KeyboardEvent) {
    const {
      isVideoExpanded,
    } = this.props;
    if (!isVideoExpanded) return;
    switch (event.code) {
      case 'ArrowUp':
        event.preventDefault();
        this.setState({
          isBackButtonSelected: true,
          isNavigationSelected: false,
          selectedPosition: 4,
        });
        break;
      case 'ArrowDown':
        event.preventDefault();
        this.setState({
          isNavigationSelected: true,
          isBackButtonSelected: false,
          selectedPosition: 1,
        });
        break;
      case 'ArrowLeft':
        event.preventDefault();
        this.moveLeft();
        break;
      case 'ArrowRight':
        event.preventDefault();
        this.moveRight();
        break;
      case 'Enter':
        event.preventDefault();
        if (this.state.isBackButtonSelected) {
          this.handleEventSource(event);
        } else {
          if (this.state.selectedPosition === 0) {
            this.handleRewind();
          }
          if (this.state.selectedPosition === 1) {
            this.handlePlayPause();
          }
          if (this.state.selectedPosition === 2) {
            this.handleFastForward();
          }
        }
        break;
      case 'Backspace':
        event.preventDefault();
        this.handleEventSource(event);
        break;
      default:
    }
    this.setState({ showInterface: true });
    clearTimeout((this: any).videoShower);
    this.hideInterface();
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
    const lastTimeProgress: number = LS.getProgressTimeById(id);
    const videoLengthSecs = Math.round((this: any).player.duration());
    const timeProgressSecs = Math.round((videoLengthSecs * (lastTimeProgress / 100)) - lagTime);
    (this: any).player.currentTime(timeProgressSecs);
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
  hideInterface() {
    if (this.state.isVideoPlaying) {
      (this: any).videoShower = setTimeout(() => {
        this.setState({
          showInterface: false,
          selectedPosition: 1,
          isBackButtonSelected: false,
          isNavigationSelected: true,
        });
      }, 1500);
    }
  }
  render() {
    const {
      isVideoExpanded,
      posterImage,
    } = this.props;
    const videoPlayerInterface = isVideoExpanded ? (
      <VideoPlayerInterface
        episodeTitle={this.props.episodeTitle}
        isVideoPlaying={this.state.isVideoPlaying}
        progress={this.state.timeProgress}
        currentTime={this.showFormattedTime(player => player.currentTime())}
        endOfVideo={this.showFormattedTime(player => player.duration())}
        isBackButtonSelected={this.state.isBackButtonSelected}
        selectedPosition={this.state.selectedPosition}
        isVisible={this.state.showInterface}
      />
    ) : null;
    return (
      <div className="video-player">
        <div data-vjs-player>
          <video
            ref={(node) => { (this: any).videoNode = node; }}
            onLoadedData={this.handleVideoLoad}
            onEnded={this.handleEndReached}
            onTimeUpdate={this.handleTimeUpdate}
            className="video-js vjs-big-play-centered"
            poster={posterImage}
          />
          {videoPlayerInterface}
        </div>
      </div>
    );
  }
}

export default VideoPlayer;
