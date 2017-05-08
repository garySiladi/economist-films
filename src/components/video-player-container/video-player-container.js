// @flow
import React from 'react';
import VideoPlayer from './parts/video-player';
import { getEpisodeByID } from '../../api/fetch';
import './video-player-container.css';

export type VideoPlayerContainerPropsType = {
  params: Object,
}

export type VideoPlayerContainerStateType = {
  videoUrl: string,
}

class VideoPlayerContainer extends React.Component {
  static getVideoUrl(episode) {
    return episode.video_url;
  }

  constructor(props: VideoPlayerContainerPropsType) {
    super(props);
    this.state = {
      videoUrl: '',
    };
  }

  state: VideoPlayerContainerStateType;

  componentWillMount() {
    getEpisodeByID(this.props.params.id)
    .then((episode) => {
      this.setState({ videoUrl: VideoPlayerContainer.getVideoUrl(episode) });
    });
  }

  render() {
    return (
      <div className="video-player-container">
        {this.state.videoUrl ?
          <VideoPlayer
            videoUrl={this.state.videoUrl}
            showUI
            posterImage={null}
            isMuted={false}
          />
          : null
        }
      </div>
    );
  }
}

export default VideoPlayerContainer;
