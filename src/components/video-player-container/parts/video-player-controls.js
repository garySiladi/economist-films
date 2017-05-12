// @flow
import React from 'react';
// import classnames from 'classnames';
import './video-player-controls.css';
import Rewind from '../../../../public/assets/RW.svg';
import Forward from '../../../../public/assets/FF.svg';
import Play from '../../../../public/assets/Play.svg';
import Pause from '../../../../public/assets/Pause.svg';

type VideoPlayerControlsProps = {
  isVideoPlaying: boolean,
  progress: number,
  selectedPosition: number,
}

class VideoPlayerControls extends React.Component { // eslint-disable-line react/prefer-stateless-function, max-len
  props: VideoPlayerControlsProps;
  render() {
    const progressBarStyle = {
      width: `${this.props.progress}%`,
    };
    const selectedPosition = this.props.selectedPosition;

    return (
      <div className="player-interface">
        <div className="player-interface__progress-bar-container" >
          <div className="player-interface__progress-bar" style={progressBarStyle} />
        </div>
        <div className="player-interface__navigation-wrapper">
          <button
            className={`player-interface__navigation-control ${selectedPosition === 0 ? 'selected' : ' '}`}
          >
            <img
              src={Rewind}
              alt="right"
              className="player-interface-navigation-icons"
              id="1"
            />
          </button>
          <button
            className={`player-interface__navigation-control ${selectedPosition === 1 ? 'selected' : ' '}`}
          >
            <img
              src={this.props.isVideoPlaying ? Pause : Play}
              alt="Play/Pause"
              className="player-interface-navigation-icons"
              id="2"
            />
          </button>
          <button
            className={`player-interface__navigation-control ${selectedPosition === 2 ? 'selected' : ' '}`}
          >
            <img
              src={Forward}
              alt="left"
              className="player-interface-navigation-icons"
              id="3"
            />
          </button>
        </div>
      </div>
    );
  }
}
export default VideoPlayerControls;
