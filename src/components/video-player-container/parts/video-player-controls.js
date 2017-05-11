// @flow
import React from 'react';
import classnames from 'classnames';
import './video-player-controls.css';
import Rewind from '../../../../public/assets/RW.svg';
import Forward from '../../../../public/assets/FF.svg';
import Play from '../../../../public/assets/Play.svg';
import Pause from '../../../../public/assets/Pause.svg';

export type VideoPlayerControlsProps = {
  playVideo: Function,
  pauseVideo: Function,
  fastForward: Function,
  isVideoPlaying: boolean,
  isControlSelected: boolean,
  fastRewind: Function,
  progress: number,
}

class VideoPlayerControls extends React.Component {
  constructor(props: VideoPlayerControlsProps) {
    super(props);
    (this: any).handleKeyPress = this.handleKeyPress.bind(this);
  }
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }
  handleKeyPress(event: KeyboardEvent) {
    if (this.props.isControlSelected) {
      switch (event.key) {
        case 'ArrowLeft':
          this.props.fastRewind();
          break;
        case 'ArrowRight':
          this.props.fastForward();
          break;
        case 'Enter':
          if (this.props.isVideoPlaying) {
            this.props.pauseVideo();
          } else {
            this.props.playVideo();
          }
          break;
        default:
      }
    }
  }

  render() {
    const progressBarStyle = {
      width: `${this.props.progress}%`,
    };
    const videoControlsClassName= classnames({
      'player-interface': true,
      selected: this.props.isControlSelected,
    });
    return (
      <div className={videoControlsClassName}>
        <div className="player-interface__progress-bar-container" >
          <div className="player-interface__progress-bar" style={progressBarStyle} />
        </div>
        <div className="player-interface__navigation-wrapper">
          <button className="player-interface__navigation-control" onClick={this.props.fastRewind}>
            <img src={Rewind} alt="right" className="player-interface-navigation-icons" />
          </button>
          <button
            onClick={this.props.isVideoPlaying ? this.props.pauseVideo : this.props.playVideo}
            className="player-interface__navigation-control"
          >
            <img src={this.props.isVideoPlaying ? Pause : Play} alt="Play/Pause" className="player-interface-navigation-icons" />
          </button>
          <button
            className="player-interface__navigation-control"
            onClick={this.props.fastForward}
          >
            <img src={Forward} alt="left" className="player-interface-navigation-icons" />
          </button>
        </div>
      </div>
    );
  }
}
export default VideoPlayerControls;
