// @flow
import React from 'react';
// $FlowFixMe
import 'video.js/dist/video-js.css';
import { Link } from 'react-router';
import videojs from 'video.js';
import VideoPlayerControls from './video-player-controls';
import './video-player.css';


window.videojs = videojs;
require('videojs-contrib-hls/dist/videojs-contrib-hls.js');

export type VideoPlayerType = {
  videoUrl: string,
};
export type Props = {
  videoUrl: string,
  setLocalStorage: Function,
};

const videoJsOptions = (videoUrl: string) => ({
  autoplay: true,
  controls: false,
  sources: [{
    src: videoUrl,
    type: 'application/x-mpegURL',
  }],
});

class VideoPlayer extends React.Component {
  constructor(props: Props) {
    super(props);
    (this: any).moveTime = 10;
    (this: any).videoNode = null;
    (this: any).player = null;
    (this: any).fullLenghtOfVideo = 0;
    (this: any).total = null;
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
  state: {
     isPlaying: boolean,
     timeProgress: number,
  };

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
    if ((this: any).player.remainingTime()>10) {
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

  props: VideoPlayerType;
  render() {
    return (
      <div className="video-player-wrapper">
        <button>
          <Link to="/">Back</Link>
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
          play={this.handlePlay}
          pause={this.handlePause}
          isPlaying={this.state.isPlaying}
          fastForward={this.handleFastForward}
          fastRewind={this.handleRewind}
          progress={this.state.timeProgress}
        />
      </div>);
  }
}

export default VideoPlayer;
