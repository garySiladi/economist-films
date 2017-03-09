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
  </div>
);

export default About;
