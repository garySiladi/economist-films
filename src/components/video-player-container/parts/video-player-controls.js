// @flow
import React from 'react';
import classnames from 'classnames';
import './video-player-controls.css';
import Rewind from '../../../../public/assets/RW.svg';
import Forward from '../../../../public/assets/FF.svg';
import Play from '../../../../public/assets/Play.svg';
import Pause from '../../../../public/assets/Pause.svg';

export type VideoPlayerControlsProps = {
  isVideoPlaying: boolean,
  progress: number,
  selectedPosition: number,
}

const VideoPlayerControls = ({
  isVideoPlaying,
  progress,
  selectedPosition,
}: VideoPlayerControlsProps) => {
  const progressBarStyle = {
    width: `${progress}%`,
  };
  const fastRewindButtonClassnames = classnames({
    'player-interface__navigation-control': true,
    selected: selectedPosition === 0,
  });
  const playPauseButtonClassnames = classnames({
    'player-interface__navigation-control': true,
    selected: selectedPosition === 1,
  });
  const fastForwardButtonClassnames = classnames({
    'player-interface__navigation-control': true,
    selected: selectedPosition === 2,
  });
  return (
    <div className="player-interface">
      <div className="player-interface__progress-bar-container" >
        <div className="player-interface__progress-bar" style={progressBarStyle} />
      </div>
      <div className="player-interface__navigation-wrapper">
        <button
          className={fastRewindButtonClassnames}
        >
          <img
            src={Rewind}
            alt="left"
            className="player-interface__navigation-icons"
            id="1"
          />
        </button>
        <button
          className={playPauseButtonClassnames}
        >
          <img
            src={isVideoPlaying ? Pause : Play}
            alt="Play/Pause"
            className="player-interface__navigation-icons"
            id="2"
          />
        </button>
        <button
          className={fastForwardButtonClassnames}
        >
          <img
            src={Forward}
            alt="right"
            className="player-interface__navigation-icons"
            id="3"
          />
        </button>
      </div>
    </div>
  );
};
export default VideoPlayerControls;
