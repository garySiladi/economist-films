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
};
export type VideoPlayerStateType = {
  isVideoPlaying: boolean,
  timeProgress: number,
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
    (this: any).player = videojs((this: any).videoNode, { ...videoJsOptions(this.props.videoUrl) });
  }

  componentWillUnmount() {
    if ((this: any).player) {
      (this: any).player.dispose();
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
    return (
      <div className="video-player">
        <div data-vjs-player>
          <button className="video-player-back-button" onClick={browserHistory.goBack}>
            <img src={Back} alt="Back" className="video-player-back-icons" />
          </button>
          <video
            ref={(node) => { (this: any).videoNode = node; }}
            onEnded={this.handleEndReached}
            onTimeUpdate={this.handleTimeUpdate}
            className="video-js vjs-big-play-centered"
          />
          <VideoPlayerControls
            playVideo={this.handlePlay}
            pauseVideo={this.handlePause}
            isVideoPlaying={this.state.isVideoPlaying}
            fastForward={this.handleFastForward}
            fastRewind={this.handleRewind}
            progress={this.state.timeProgress}
          />
        </div>
      </div>);
  }
}

export default VideoPlayer;
