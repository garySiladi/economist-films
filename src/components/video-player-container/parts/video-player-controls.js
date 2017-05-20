// @flow
import React from 'react';
import classnames from 'classnames';
import './video-player-controls.css';
import Rewind from '../../../../public/assets/RW.svg';
import Forward from '../../../../public/assets/FF.svg';
import Play from '../../../../public/assets/Play.svg';
import Pause from '../../../../public/assets/Pause.svg';

export type VideoPlayerInterfaceProps = {
  isVideoPlaying: boolean,
  progress: number,
  currentTime: string,
  endOfVideo: string,
  selectedPosition: number,
};

const VideoPlayerInterface = ({
  isVideoPlaying,
  progress,
  selectedPosition,
  currentTime,
  endOfVideo,
}: VideoPlayerInterfaceProps) => {
  const progressBarStyle = {
    width: `${progress}%`,
  };
  const createNavigationControlClassname = position => classnames({
    'player-interface__navigation-control': true,
    selected: selectedPosition === position,
  });
  return (
    <div className="player-interface">
      <div className="player-interface__progress-time">
        <div className="player-interface__progress-time--current">{currentTime}</div>
        <div className="player-interface__progress-time--final">{endOfVideo}</div>
      </div>
      <div className="player-interface__progress-bar-container" >
        <div className="player-interface__progress-bar" style={progressBarStyle} />
      </div>
      <div className="player-interface__navigation-wrapper">
        <button
          className={createNavigationControlClassname(0)}
        >
          <img
            src={Rewind}
            alt="left"
            className="player-interface__navigation-icons"
            id="1"
          />
        </button>
        <button
          className={createNavigationControlClassname(1)}
        >
          <img
            src={isVideoPlaying ? Pause : Play}
            alt="Play/Pause"
            className="player-interface__navigation-icons"
            id="2"
          />
        </button>
        <button
          className={createNavigationControlClassname(2)}
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
export default VideoPlayerInterface;
