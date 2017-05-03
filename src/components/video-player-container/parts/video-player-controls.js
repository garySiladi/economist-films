// @flow
import React from 'react';
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
  fastRewind: Function,
  progress: number,
}
const VideoPlayerControls = ({
  playVideo,
  pauseVideo,
  fastForward,
  isVideoPlaying,
  fastRewind,
  progress,
  }: VideoPlayerControlsProps) => {
  const progressBarStyle = {
    width: `${progress}%`,
  };

  return (
    <div className="player-interface">
      <div className="player-interface__progress-bar-container" >
        <div className="player-interface__progress-bar" style={progressBarStyle} />
      </div>
      <div className="player-interface__navigation-wrapper">
        <button className="player-interface__navigation-control" onClick={fastRewind}>
          <img src={Rewind} alt="right" className="player-interface-navigation-icons" />
        </button>
        <button onClick={isVideoPlaying ? pauseVideo : playVideo} className="player-interface__navigation-control" >
          <img src={isVideoPlaying ? Pause : Play} alt="Play/Pause" className="player-interface-navigation-icons" />
        </button>
        <button
          className="player-interface__navigation-control"
          onClick={fastForward}
        >
          <img src={Forward} alt="left" className="player-interface-navigation-icons" />
        </button>
      </div>
    </div>
  );
};
export default VideoPlayerControls;
