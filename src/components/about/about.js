// @flow
import React from 'react';
import { Link } from 'react-router';

const About = () => (
  <div>
    <span>This is the about page</span>
    <button type="button">
      <Link to="/">
        Back
      </Link>
    </button>
    <video
      id="my-player"
      className="video-js"
      controls
      preload="auto"
      poster="//vjs.zencdn.net/v/oceans.png"
      data-setup="{}"
    >
      <source src="//vjs.zencdn.net/v/oceans.mp4" type="video/mp4" />
      <p className="vjs-no-js">
        To view this video please enable JavaScript, and consider upgrading to a
        web browser that
        <a href="http://videojs.com/html5-video-support/" target="_blank" rel="noopener noreferrer">
          supports HTML5 video
        </a>
      </p>
    </video>
  </div>
);

export default About;
