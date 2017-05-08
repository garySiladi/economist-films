// @flow
import React from 'react';
import { browserHistory } from 'react-router';
// $FlowFixMe
import 'video.js/dist/video-js.css';
import videojs from 'video.js';
import VideoPlayerControls from './video-player-controls';
import './video-player.css';
import Back from '../../../../public/assets/RW.svg';

window.videojs = videojs;
// eslint-disable-next-line
require('videojs-contrib-hls/dist/videojs-contrib-hls.js');

export type VideoPlayerPropsType = {
  videoUrl: string,
  showUI: boolean,
  isMuted: boolean,
  posterImage: ?string,
};
export type VideoPlayerStateType = {
  isVideoPlaying: boolean,
  timeProgress: number,
}

const videoJsOptions = (videoUrl: string, isMuted) => ({
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

  constructor(props: VideoPlayerPropsType) {
    super(props);
    (this: any).moveTime = 10;
    (this: any).videoNode = null;
    (this: any).player = null;
    this.state = {
      isVideoPlaying: true,
      timeProgress: 0,
    };
    (this: any).handleFastForward = this.handleFastForward.bind(this);
    (this: any).handlePlay = this.handlePlay.bind(this);
    (this: any).handlePause = this.handlePause.bind(this);
    (this: any).handleRewind = this.handleRewind.bind(this);
    (this: any).handleEndReached = this.handleEndReached.bind(this);
    (this: any).handleTimeUpdate = this.handleTimeUpdate.bind(this);
  }
  state: VideoPlayerStateType;
  componentDidMount() {
    const {
      videoUrl,
      isMuted,
    } = this.props;
    (this: any).player =
      videojs((this: any).videoNode, { ...videoJsOptions(videoUrl, isMuted) });
  }
  componentWillUnmount() {
    if ((this: any).player) {
      (this: any).player.dispose();
    }
  }
  props: VideoPlayerPropsType;
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

  render() {
    const {
      showUI,
      posterImage,
    } = this.props;
    const videoPlayerControls = showUI ? (
      <VideoPlayerControls
        playVideo={this.handlePlay}
        pauseVideo={this.handlePause}
        isVideoPlaying={this.state.isVideoPlaying}
        fastForward={this.handleFastForward}
        fastRewind={this.handleRewind}
        progress={this.state.timeProgress}
      />
    ) : null;
    const backButton = showUI ? (
      <button className="video-player-back-button" onClick={browserHistory.goBack}>
        <img src={Back} alt="Back" className="video-player-back-icons" />
      </button>
    ) : null;
    return (
      <div className="video-player">
        <div data-vjs-player>
          {backButton}
          <video
            ref={(node) => { (this: any).videoNode = node; }}
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
