// @flow
import React from 'react';
import VideoPlayer from './parts/video-player';
import { getEpisodeByID } from '../../api/fetch';
import './video-player-container.css';

export type VideoPlayerContainerPropsType = {
  params: Object,
}

export type VideoPlayerContainerStateType = {
  episodeTitle: string,
  videoUrl: string,
}

class VideoPlayerContainer extends React.Component {
  constructor(props: VideoPlayerContainerPropsType) {
    super(props);
    this.state = {
      episodeTitle: '',
      videoUrl: '',
    };
  }

  state: VideoPlayerContainerStateType;

  componentWillMount() {
    getEpisodeByID(this.props.params.id)
    .then((episode) => {
      this.setState({ videoUrl: episode.video_url, episodeTitle: episode.title });
    });
  }

  render() {
    return (
      <div className="video-player-container">
        {this.state.videoUrl ?
          <VideoPlayer
            episodeTitle={this.state.episodeTitle}
            videoUrl={this.state.videoUrl}
            videoID={this.props.params.id}
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
