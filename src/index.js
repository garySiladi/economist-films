// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import App from './components/app/app';
import HomeContainer from './components/home-container/home-container';
import EpisodeDetailContainer from './components/episode-detail-container/episode-detail-container';
import VideoPlayer from './components/video-player/video-player';
import './index.css';

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App} />
    <Route path="/home" component={HomeContainer} />
    <Route path="/episode/:id" component={EpisodeDetailContainer} />
    <Route path="/watch" component={VideoPlayer} />
  </Router>
), document.getElementById('root'));
