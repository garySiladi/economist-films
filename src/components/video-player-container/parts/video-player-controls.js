// @flow
import React from 'react';
import './video-player-controls.css';
import Right from '../../../../public/assets/RW.svg';
import Left from '../../../../public/assets/FF.svg';
import Play from '../../../../public/assets/Play.svg';
import Pause from '../../../../public/assets/Pause.svg';

export type VideoPlayerControlsType = {
  play: Function,
  pause: Function,
  fastForward: Function,
  isPlaying: boolean,
  fastRewind: Function,
  progress: number,
}
const VideoPlayerControls = ({
  play,
  pause,
  fastForward,
  isPlaying,
  fastRewind,
  progress,
  }: VideoPlayerControlsType) => {
  const progressBar = {
    width: `${progress}%`,
  };

  return (
    <div className="navigation-container">
      <div className="progress-bar-container">
        <div className="progress-bar" style={progressBar} />
      </div>
      <div className="navigation-controls">
        <button className="navigation-controls__play-back" onClick={fastRewind}>
          <img src={Right} alt="right" />
        </button>
        <button
          className={isPlaying ?
            'navigation-controls__pause' : 'navigation-controls__play'}
          onClick={isPlaying ? pause : play}
        >
          <img src={isPlaying ? Pause : Play} alt="Play/Pause" />
        </button>
        <button className="navigation-controls__play-forward" onClick={fastForward}>
          <img src={Left} alt="left" />
        </button>
      </div>
    </div>
  );
};
export default VideoPlayerControls;
