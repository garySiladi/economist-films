// @flow
import React from 'react';
import { Link } from 'react-router';
import { VideoPlayerStructure } from '../../structures/episode';

const VideoPlayer = ({ location }: VideoPlayerStructure) => (
  <div className="video-player">
    <p className="video-player__id">id: {location.query.id}</p>
    <Link to="/" >{'<== Back'}</Link>
  </div>
);

export default VideoPlayer;
