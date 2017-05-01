// @flow
import React from 'react';
import { browserHistory } from 'react-router';
// $FlowFixMe
import 'video.js/dist/video-js.css';
import videojs from 'video.js';
import VideoPlayerControls from './video-player-controls';
import './video-player.css';

window.videojs = videojs;
// eslint-disable-next-line
require('videojs-contrib-hls/dist/videojs-contrib-hls.js');

export type VideoPlayerPropsType = {
  videoUrl: string,
};
export type VideoPlayerStateType = {
  isPlaying: boolean,
  timeProgress: number,
}

const videoJsOptions = (videoUrl: string) => ({
  autoplay: true,
  controls: false,
  sources: [{
    src: videoUrl,
    type: 'application/x-mpegURL',
  }],
});

class VideoPlayer extends React.Component {
  constructor(props: VideoPlayerPropsType) {
    super(props);
    (this: any).moveTime = 10;
    (this: any).videoNode = null;
    (this: any).player = null;
    (this: any).fullLenghtOfVideo = 0;
    this.state = {
      isPlaying: true,
      timeProgress: 0,
    };
    (this: any).handleFastForward = this.handleFastForward.bind(this);
    (this: any).handlePlay = this.handlePlay.bind(this);
    (this: any).handlePause = this.handlePause.bind(this);
    (this: any).handleRewind = this.handleRewind.bind(this);
    (this: any).handleEnd = this.handleEnd.bind(this);
    (this: any).handleOnLoad = this.handleOnLoad.bind(this);
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
    this.setState({ isPlaying: true });
    (this: any).player.play();
  }

  handlePause() {
    this.setState({ isPlaying: false });
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

  handleEnd() {
    this.setState({
      isPlaying: false,
    });
    (this: any).player.currentTime(0);
  }

  handleOnLoad() {
    (this: any).fullLenghtOfVideo = (this: any).player.duration();
  }

  handleTimeUpdate() {
    const progress :number =
      ((100 / (this: any).player.duration()) * (this: any).player.currentTime());
    this.setState({
      timeProgress: Math.round(progress),
    });
  }

  render() {
    return (
      <div className="video-player">
        <button onClick={browserHistory.goBack}>
          Back
        </button>
        <div data-vjs-player>
          <video
            ref={(node) => { (this: any).videoNode = node; }}
            onEnded={this.handleEnd}
            onLoadedMetadata={this.handleOnLoad}
            onTimeUpdate={this.handleTimeUpdate}
            className="video-js vjs-big-play-centered"
          />
        </div>
        <VideoPlayerControls
          playVideo={this.handlePlay}
          pauseVideo={this.handlePause}
          isVideoPlaying={this.state.isPlaying}
          fastForward={this.handleFastForward}
          fastRewind={this.handleRewind}
          progress={this.state.timeProgress}
        />
      </div>);
  }
}

export default VideoPlayer;
