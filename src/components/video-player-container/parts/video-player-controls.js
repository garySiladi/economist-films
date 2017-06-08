// @flow
import React from 'react';
import classnames from 'classnames';
import './video-player-controls.css';
import Back from '../../../../public/assets/Square-Arrow.svg';
import Rewind from '../../../../public/assets/RW.svg';
import Forward from '../../../../public/assets/FF.svg';
import Play from '../../../../public/assets/Play.svg';
import Pause from '../../../../public/assets/Pause.svg';

export type VideoPlayerInterfaceProps = {
  episodeTitle: string,
  isVideoPlaying: boolean,
  progress: number,
  currentTime: string,
  endOfVideo: string,
  isBackButtonSelected: boolean,
  selectedPosition: number,
  isVisible: boolean,
};

const VideoPlayerInterface = ({
  episodeTitle,
  isVideoPlaying,
  progress,
  isBackButtonSelected,
  selectedPosition,
  currentTime,
  endOfVideo,
  isVisible,
}: VideoPlayerInterfaceProps) => {
  const progressBarStyle = {
    width: `${progress}%`,
  };
  const createNavigationControlClassname = position => classnames({
    'player-interface__navigation-control': true,
    selected: selectedPosition === position,
  });
  return (
    <div className={classnames('player-interface', { 'player-interface--hidden': !isVisible })}>
      <div className="player-interface__top">
        <button
          className={classnames(
            'player-interface__back-button',
            { selected: isBackButtonSelected },
          )}
        >
          <img
            src={Back}
            alt="Back"
            className={classnames(
              'player-interface__navigation-icons',
              'player-interface__navigation-icons--back',
            )}
          />
        </button>
        <div>{progress}</div>
        <span className="player-interface__episode-title">
          {episodeTitle}
        </span>
      </div>
      <div className="player-interface__bottom">
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
              className={classnames(
                'player-interface__navigation-icons',
                'player-interface__navigation-icons--rewind',
              )}
              id="1"
            />
          </button>
          <button
            className={createNavigationControlClassname(1)}
          >
            <img
              src={isVideoPlaying ? Pause : Play}
              alt="Play/Pause"
              className={classnames(
                'player-interface__navigation-icons',
                {
                  'player-interface__navigation-icons--play': !isVideoPlaying,
                  'player-interface__navigation-icons--pause': isVideoPlaying,
                },
              )}
              id="2"
            />
          </button>
          <button
            className={createNavigationControlClassname(2)}
          >
            <img
              src={Forward}
              alt="right"
              className={classnames(
                'player-interface__navigation-icons',
                'player-interface__navigation-icons--forward',
              )}
              id="3"
            />
          </button>
        </div>
      </div>
    </div>
  );
};
export default VideoPlayerInterface;
